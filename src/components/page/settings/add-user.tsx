import { FC, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { InfoCircle } from "iconsax-react"
import useMeasure from "react-use-measure"
import { Icon } from "@iconify-icon/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput, BaseSelectInput, ComboBox, RenderIf } from "@/components/core"
import { useCreateUser } from "@/services/hooks/mutations/useUser"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useGetDepartments, useGetExistingUsers, useGetJobTitles, useGetRoles, useGetUsers } from "@/services/hooks/queries"
import { createUserFirstStepSchema, createUserSecondStepSchema } from "@/validations/user"
import { useDebounce } from "@/hooks/useDebounce"
import { JobTitleType } from "@/types/job-title"
import { Loader } from "@/components/core/Button/Loader"

const steps = [
    { label: "Basic Details", description: "Input staff ID and email" },
    { label: "Staff Details", description: "Input more details about the staff" }
]

interface AddUserProps {
    isOpen: boolean;
    close: () => void;
}

export const AddUser: FC<AddUserProps> = ({ isOpen, close }) => {
    const [ref, bounds] = useMeasure()

    const [employeeId, setEmployeeId] = useState("");

    const { value: jobTitleValue, onChangeHandler: onChangeJobTitle } = useDebounce(500)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [direction, setDirection] = useState<any>()

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { mutate, isPending } = useCreateUser(() => onClose())
    const { data: users } = useGetUsers({ page_size: Number.MAX_SAFE_INTEGER.toString()})
    const { data: roles } = useGetRoles({ page_size: Number.MAX_SAFE_INTEGER.toString()})
    const { data: departments } = useGetDepartments({ page_size: Number.MAX_SAFE_INTEGER.toString()});
    const { data: existingUsers, isLoading: isLoadingExistingUsers } = useGetExistingUsers({ page_size: "10", staff_id: employeeId })
    const { data: jobTitles, isLoading: isLoadingJobTitles } = useGetJobTitles({ page_size: "10", name: jobTitleValue })
    
    const filteredExistingUsers = useMemo(() => {
        return existingUsers?.data || []
    }, [existingUsers])

    const fetchedUsers = useMemo(() => {
        return users?.data?.map((user) => ({ value: user?.id?.toString(), label: `${user?.first_name} ${user?.last_name}` })) || []
    }, [users])

    const fetchedRoles = useMemo(() => {
        return roles?.map((role) => ({ value: role?.id?.toString(), label: role?.name?.replace(/_/i, " ") })) || []
    }, [roles])

    const fetchedDepartments = useMemo(() => {
        return departments?.filter((item) => item.level === "department")?.sort((a,b) => a.name > b.name ? 1 : -1)?.map((department) => ({ value: department?.id?.toString(), label: department?.name })) || []
    }, [departments])
    
    const fetchedJobTitles = useMemo(() => {
        return jobTitles?.data || []
    }, [jobTitles])

    const stepOneForm = useFormikWrapper({
        initialValues: {
            staffId: "",
            email: "",
            firstName: "",
            lastName: "",
        },
        validationSchema: createUserFirstStepSchema,
        onSubmit() {
            setDirection(1)
            setCurrentStep(1)
        },
    })

    useDebounce(500, stepOneForm.values.staffId, () => setEmployeeId(stepOneForm.values.staffId));

    const stepTwoForm = useFormikWrapper({
        initialValues: {
            department_id: "",
            division_id: "",
            branch_id: "",
            section_id: "",
            position: "",
            role_id: "",
            supervisor_id: ""
        },
        validationSchema: createUserSecondStepSchema,
        onSubmit(values) {
            const { department_id, role_id, supervisor_id, division_id, branch_id, section_id, ...rest } = values
            mutate({
                ...rest,
                ...stepOneForm.values,
                department_id: parseInt(department_id),
                division_id: parseInt(division_id),
                branch_id: parseInt(branch_id),
                section_id: parseInt(section_id),
                role_id: parseInt(role_id as string),
                supervisor_id: parseInt(supervisor_id as string)
            })
        },
    })

    const { data: divisions } = useGetDepartments({ page_size: Number.MAX_SAFE_INTEGER.toString(), parentID: stepTwoForm.values.department_id })

    const fetchedDivisions = useMemo(() => {
        return divisions?.filter((item) => item.level === "division")?.sort((a,b) => a.name > b.name ? 1 : -1)?.map((department) => ({ value: department?.id?.toString(), label: department?.name })) || []
    }, [divisions])

    const { data: branches } = useGetDepartments({ page_size: Number.MAX_SAFE_INTEGER.toString(), parentID: stepTwoForm.values.division_id })

    const fetchedBranches = useMemo(() => {
        return branches?.filter((item) => item.level === "branch")?.sort((a,b) => a.name > b.name ? 1 : -1)?.map((department) => ({ value: department?.id?.toString(), label: department?.name })) || []
    }, [branches])

    const { data: sections } = useGetDepartments({ page_size: Number.MAX_SAFE_INTEGER.toString(), parentID: stepTwoForm.values.branch_id })

    const fetchedSections = useMemo(() => {
        return sections?.filter((item) => item.level === "section")?.sort((a,b) => a.name > b.name ? 1 : -1)?.map((department) => ({ value: department?.id?.toString(), label: department?.name })) || []
    }, [sections])

    const content = useMemo(() => {
        if (!isModalOpen) {
            return null
        }
        switch (currentStep) {
            case 0:
                return (
                    <form onSubmit={stepOneForm.handleSubmit} className="flex flex-col space-y-8 w-full">
                        
                        <div className="relative" ref={dropdownRef}>
                            {/* Input */}
                            <BaseInput
                                type="text"
                                label="Staff ID"
                                {...stepOneForm.register("staffId")}
                                onFocus={() => {
                                if (filteredExistingUsers.length > 0 && stepOneForm.values.staffId.length > 0) setIsDropdownOpen(true);
                                }}
                                onChange={(e) => {
                                stepOneForm.register("staffId").onChange(e);
                                if (filteredExistingUsers.length > 0) setIsDropdownOpen(true);
                                }}
                                autoComplete="off"
                            />

                            {/* Dropdown */}
                            <RenderIf condition={isDropdownOpen && (filteredExistingUsers.length > 0 || isLoadingExistingUsers)}>
                                <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-md border border-gray-300 bg-white-10 shadow-lg z-50">
                                    <RenderIf condition={isLoadingExistingUsers}>
                                        <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center py-6">
                                            <Loader className="spinner size-6 text-green-primary-40" />
                                        </div>
                                    </RenderIf>
                                    <RenderIf condition={filteredExistingUsers.length > 0}>
                                        {filteredExistingUsers.map((item) => (
                                            <div
                                            key={item.staff_id}
                                            onClick={() => {
                                                stepOneForm.setValues({
                                                staffId: item.staff_id,
                                                email: item.email,
                                                firstName: item.first_name,
                                                lastName: item.last_name,
                                                });
                                                setIsDropdownOpen(false);
                                            }}
                                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                                            >
                                            {item.staff_id}
                                            </div>
                                        ))}
                                    </RenderIf>
                                </div>
                            </RenderIf>
                            </div>



                        {/* <ComboBox
                            label="Employee ID"
                            options={filteredExistingUsers} 
                            disabled={isLoadingExistingUsers}
                            error={stepOneForm.errors.staffId}
                            defaultValue={stepOneForm.values.staffId}
                            onClose={() => onChangeHandler({ target: { value: "" } } as any)}
                            onChange={(value) => onChangeHandler({ target: { value } } as any)} 
                            displayValue={(item: FetchedExistingUserType) => item?.staff_id || stepOneForm.values.staffId} 
                            optionLabel={(option: FetchedExistingUserType) => option?.staff_id} 
                            setSelected={(value: FetchedExistingUserType) => stepOneForm.setFieldValue("staffId", value?.staff_id)} 
                        /> */}
                        <BaseInput
                            type="text"
                            label="First Name"
                            {...stepOneForm.register("firstName")}
                        />
                        <BaseInput
                            type="text"
                            label="Last Name"
                            {...stepOneForm.register("lastName")}
                        />
                        <BaseInput
                            type="text"
                            label="Staff Email"
                            {...stepOneForm.register("email")}
                            help={
                                <div className="flex items-center gap-1 p-2 rounded font-medium text-xs text-green-secondary-40 bg-green-secondary-10">
                                    <InfoCircle size="14" color="#0F973D" />
                                    Note: Ensure the email inputted is correct for users will be invited via mail
                                </div>
                            }
                        />
                        <BaseButton type="submit" size="small" theme="primary" variant="filled" disabled={!stepOneForm.isValid} block>Next</BaseButton>
                    </form>
                )
            case 1:
                return (
                    <form onSubmit={stepTwoForm.handleSubmit} className="flex flex-col space-y-8 w-full">
                        <BaseSelectInput label="Department" options={fetchedDepartments} {...stepTwoForm.register("department_id")} />
                        <RenderIf condition={!!stepTwoForm.values.department_id}>
                            <BaseSelectInput label="Division" options={fetchedDivisions} {...stepTwoForm.register("division_id")} />
                        </RenderIf>
                        <RenderIf condition={!!stepTwoForm.values.division_id}>
                            <BaseSelectInput label="Branch" options={fetchedBranches} {...stepTwoForm.register("branch_id")} />
                        </RenderIf>
                        <RenderIf condition={!!stepTwoForm.values.branch_id}>
                            <BaseSelectInput label="Section" options={fetchedSections} {...stepTwoForm.register("section_id")} />
                        </RenderIf>
                        <ComboBox
                            label="Job Title"
                            options={fetchedJobTitles}
                            disabled={isLoadingJobTitles}
                            error={stepTwoForm.errors.position}
                            defaultValue={stepTwoForm.values.position}
                            onClose={() => onChangeJobTitle({ target: { value: "" } } as any)}
                            onChange={(value) => onChangeJobTitle({ target: { value } } as any)} 
                            displayValue={(item: JobTitleType) => item?.name || stepTwoForm.values.position} 
                            optionLabel={(option: JobTitleType) => option?.name} 
                            setSelected={(value: JobTitleType) => stepTwoForm.setFieldValue("position", value?.name)}
                        />
                        <BaseSelectInput label="User Role" options={fetchedRoles} {...stepTwoForm.register("role_id")} />
                        <BaseSelectInput label="Supervisor" options={fetchedUsers} {...stepTwoForm.register("supervisor_id")} />
                        <div className="flex items-center w-full gap-5">
                            <BaseButton size="small" theme="primary" variant="ghost" onClick={() => {
                                setDirection(-1)
                                setCurrentStep(0)
                            }} block>Back</BaseButton>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" disabled={!stepTwoForm.isValid || isPending} loading={isPending} block>Create User</BaseButton> 
                        </div>
                    </form>
                )
        }
    }, [isModalOpen, currentStep, stepOneForm, isLoadingExistingUsers, filteredExistingUsers, stepTwoForm, fetchedDepartments, fetchedDivisions, fetchedBranches, fetchedSections, fetchedJobTitles, isLoadingJobTitles, fetchedRoles, fetchedUsers, isPending, onChangeJobTitle])

    useEffect(() => {
        setIsModalOpen(true)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
          }
        };
      
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);
      
    
    const onClose = () => {
        close()
        stepOneForm.resetForm()
        stepTwoForm.resetForm()
    }
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
            <DialogBackdrop className="fixed inset-0 bg-[#FDFDFD] duration-300 ease-out transition-all" style={{ backdropFilter: "blur(4px)" }} /> 
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex flex-col min-h-full items-center justify-start gap-12 px-20">
                    <div className="flex items-center justify-between w-full py-8">
                        <h1 className="text-xl font-semibold text-gray-900">Add Staffs</h1>
                        <button onClick={onClose} className="flex items-center py-3 px-5 gap-2 rounded-lg bg-[#F5F6F7] border border-[#F0F1F4]">
                            Close
                            <Icon icon={riCloseFill} width={20} height={20} />
                        </button>
                    </div>
                    <MotionConfig transition={{ duration: 0.5, type: "spring", bounce: 0 }}>
                        <DialogPanel as={motion.div} animate={{ height: bounds.height }} className="w-full ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-500">
                            <div ref={ref} className="relative flex items-start w-full justify-center gap-8">
                                <div className="sticky top-0 flex flex-col gap-6 p-6 border border-[#E4E7EC] rounded-xl">
                                {
                                    steps.map((step, index) =>
                                        <div key={index} className="flex items-center gap-4">
                                            <div className={cn("size-12 grid place-content-center rounded-full text-xl border transition duration-200 ease-out", currentStep >= index ? "font-bold text-white-10 bg-green-primary-40 border-green-primary-40" : "font-medium text-[#98A2B3] border-[#98A2B3]")}>{index + 1}</div>
                                            <div className="grid gap-1">
                                                <h1 className="font-semibold text-base text-grey-40">{step.label}</h1>
                                                <p className="font-normal text-xs text-[#98A2B3]">{step.description}</p>
                                            </div>
                                        </div>
                                    )
                                }
                                </div>
                                <div className="flex flex-col max-w-[42.4375rem] w-full border border-[#E6E6E6] rounded-lg">
                                    <div className="flex flex-col gap-8 p-8 overflow-x-hidden">
                                        <h1 className="font-semibold text-2xl text-gray-900 text-center">Add a new User</h1>
                                        <motion.div>
                                            <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                                                <motion.div initial={false} className="relative overflow-hidden">
                                                    <motion.div
                                                        ref={ref}
                                                        key={currentStep}
                                                        variants={variants}
                                                        initial="initial"
                                                        animate="active"
                                                        exit="exit"
                                                        custom={direction}
                                                        className="flex flex-col items-center flex-1 space-y-8 overflow-hidden"
                                                    >
                                                        {content}
                                                    </motion.div>
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </MotionConfig>
                </div>
            </div>
        </Dialog>
    )
}

const variants = {
  initial: (direction: number) => {
    return { x: `${110 * direction}%`, opacity: 0 };
  },
  active: { x: "0%", opacity: 1 },
  exit: (direction: number) => {
    return { x: `${-110 * direction}%`, opacity: 0 };
  },
};