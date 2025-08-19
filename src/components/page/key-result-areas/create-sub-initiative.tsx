import { FC, useEffect, useId, useMemo, useState } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import riAddFill from "@iconify-icons/ri/add-fill"
import { BaseButton, BaseInput, BaseSelectInput } from "@/components/core"
import { InfoCircle } from "iconsax-react"
import { useCreateSubInitiative } from "@/services/hooks/mutations"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useGetCurrentUser, useGetDepartment, useGetDepartments, useGetMeasurementUnits } from "@/services/hooks/queries"
import { AnimatePresence, motion } from "motion/react"
import { useParams } from "react-router"

interface CreateSubInitiativeProps {
    isOpen: boolean;
    close: () => void;
}

export const CreateSubInitiative: FC<CreateSubInitiativeProps> = ({ isOpen, close }) => {
    const params = useParams()
    const [parentIds, setParentIds] = useState("")
    const { data: user } = useGetCurrentUser({ enabled: false })
    const { data: measurementUnits } = useGetMeasurementUnits({ page_size: "10" })
    const { data: department } = useGetDepartment(user?.department_id?.toString() as string, { enabled: false })
    const { data: departmentBranches } = useGetDepartments({ parentID: parentIds, page_size: "10" })
    const idPrefix = useId()
    const { mutate, isPending } = useCreateSubInitiative(() => onClose())

    const { register, handleSubmit, isValid, values, errors, resetForm, setFieldValue } = useFormikWrapper({
        initialValues: {
            assigned_weight: "",
            graded_weight: "",
            kpi: "",
            kra_id: parseInt(params?.id as string) || "",
            name: "",
            target: "",
            unit_of_measurement_id: "",
            responsibilities: [] as { id: string; department_id: string; department_weight: string; level: string; }[],
        },
        enableReinitialize: true,
        onSubmit(values) {
            const { responsibilities, assigned_weight, graded_weight, unit_of_measurement_id, ...rest } = values
            const newResponsibilities = responsibilities.map((item) => ({ department_id: parseInt(item.department_id), department_weight: parseInt(item.department_weight) }))
            mutate({ ...rest, responsibilities: newResponsibilities, assigned_weight: parseInt(assigned_weight), graded_weight: parseInt(graded_weight), unit_of_measurement_id: parseInt(unit_of_measurement_id) })
        },
    })

    const onClose = () => {
        close()
        resetForm()
    }

    useEffect(() => {
        const ids = values.responsibilities?.map((item) => item?.department_id)?.filter((item) => !!item)
        if (ids.length > 0) {
            setParentIds(ids.join())
            return;
        }
    },[values.responsibilities])

    const addChildren = (level: string) => {
        return { 
            id: `${idPrefix}-${values?.responsibilities?.filter((item) => item.level === level).length}`,
            department_id: "", 
            department_weight: "",
            level
        }
    }
    const removeResponsibility = (id: string, level: string) => {
        const children = [...values.responsibilities]
        children.splice(children.indexOf(children.find((item) => (item.department_id === id) && (item.level === level))!), 1);
        setFieldValue("responsibilities", children)
    }
    const deptDivisions = useMemo(() => {
        return department?.children?.filter((item) => item?.level === "division")?.map((item) => ({ label: item?.name, value: item?.id?.toString() })) || []
    },[department?.children])
    const deptBranches = useMemo(() => {
        return departmentBranches?.filter((item) => item?.level === "branch")?.map((item) => ({ label: item?.name, value: item?.id?.toString() })) || []
    },[departmentBranches])
    const deptSections = useMemo(() => {
        return departmentBranches?.filter((item) => item?.level === "section")?.map((item) => ({ label: item?.name, value: item?.id?.toString() })) || []
    },[departmentBranches])
    const fetchedMeasurementUnits = useMemo(() => {
        return measurementUnits?.data?.map((item) => ({ label: item?.name, value: item?.id?.toString() })) || []
    },[measurementUnits])
    return (
        <Drawer.Root open={isOpen} onOpenChange={close} direction="right">
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/10" style={{ backdropFilter: "blur(4px)" }} />
                <Drawer.Content
                className="right-0 top-0 bottom-0 fixed z-10 outline-none w-full max-w-[41.8125rem] flex"
                // The gap between the edge of the screen and the drawer is 8px in this case.
                style={{ "--initial-transform": "calc(100% + 0px)" } as React.CSSProperties}
                >
                    <div className="bg-white-10 h-full w-full grow p-6 flex flex-col rounded-bl-lg">
                        <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col flex-1 gap-4 overflow-y-scroll scrollbar-hide">
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Create a sub-initiative</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Name of sub-initiative" type="text" {...register("name")} />
                                    <BaseInput label="Graded Weight" type="text" {...register("graded_weight")} />
                                    <BaseInput label="Assigned Weight" type="text" {...register("assigned_weight")} />
                                    <BaseInput label="Target" type="text" {...register("target")} />
                                    <BaseInput label="KPI" type="text" {...register("kpi")} />
                                    <BaseSelectInput label="KPI’s Unit of Measurement" options={fetchedMeasurementUnits} {...register("unit_of_measurement_id")} />
                                    <div className="grid gap-4">
                                        <span className="input--label">Select where to assign this sub-initiative</span>
                                        <div className="flex items-start justify-end gap-3 p-3 rounded bg-green-secondary-10">
                                            <InfoCircle size="14" color="#0F973D" />
                                            <span className="text-xs font-medium text-green-secondary-40 flex-1">
                                                Note: The KRA flow moves from division to section. Selecting a department-section automatically selects both the branch and division, while selecting a department-branch only selects the division.
                                            </span>
                                        </div>
                                        <div className="grid gap-2">
                                            <span className="input--label">Division</span>
                                            <AnimatePresence mode="popLayout" initial={false}>
                                            {
                                                values?.responsibilities?.filter((item) => item?.level === "division")?.map((childItem) =>
                                                    <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                        <div className="grid flex-1">
                                                            <BaseSelectInput label="Division name" options={deptDivisions} {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_id` as any)} />
                                                        </div>
                                                        <div className="grid flex-1">
                                                            <BaseInput type="number" label="Assigned Weight" className="hide-number-input-arrows" {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_weight` as any)} />
                                                        </div>
                                                        <div className="pt-6">
                                                            <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "division")}>Remove</BaseButton>
                                                        </div>
                                                    </motion.div>
                                                )
                                            }
                                            </AnimatePresence>
                                            <AnimatePresence mode="popLayout" initial={false}>
                                            {
                                                (errors.responsibilities && (typeof errors.responsibilities === "string")) ? (
                                                    <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.responsibilities}</motion.span>
                                                ) : null
                                            }
                                            </AnimatePresence>
                                            <motion.div layout animate={{ width: values?.responsibilities?.filter((item) => item?.level === "division").length > 0 ? "fit-content" : "100%" }} className="flex items-center justify-end ml-auto">
                                                <Button type="button" className="flex flex-1 items-center justify-center gap-2 p-3 rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("responsibilities", [...values.responsibilities, addChildren("division")])}>
                                                    Add division
                                                    <Icon icon={riAddFill} width={16} height={16} />
                                                </Button>
                                            </motion.div>
                                        </div>
                                        <AnimatePresence mode="popLayout">
                                            {
                                                values?.responsibilities?.some((item) => (item.level === "division") && !!item?.department_id) ? (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-2">
                                                        <span className="input--label">Branches</span>
                                                        <AnimatePresence mode="popLayout" initial={false}>
                                                        {
                                                            values?.responsibilities?.filter((item) => item?.level === "branch").map((childItem) =>
                                                                <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                                    <div className="grid flex-1">
                                                                        <BaseSelectInput label="Branch name" options={deptBranches} {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_id` as any)} />
                                                                    </div>
                                                                    <div className="grid flex-1">
                                                                        <BaseInput type="number" label="Assigned Weight" className="hide-number-input-arrows" {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_weight` as any)} />
                                                                    </div>
                                                                    <div className="pt-6">
                                                                        <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "branch")}>Remove</BaseButton>
                                                                    </div>
                                                                </motion.div>
                                                            )
                                                        }
                                                        </AnimatePresence>
                                                        <AnimatePresence mode="popLayout" initial={false}>
                                                        {
                                                            (errors.responsibilities && (typeof errors.responsibilities === "string")) ? (
                                                                <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.responsibilities}</motion.span>
                                                            ) : null
                                                        }
                                                        </AnimatePresence>
                                                        <motion.div layout animate={{ width: values?.responsibilities?.filter((item) => item?.level === "branch").length > 0 ? "fit-content" : "100%" }} className="flex items-center justify-end ml-auto">
                                                            <Button type="button" className="flex flex-1 items-center justify-center gap-2 p-3 rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("responsibilities", [...values.responsibilities, addChildren("branch")])}>
                                                                Add branch
                                                                <Icon icon={riAddFill} width={16} height={16} />
                                                            </Button>
                                                        </motion.div>
                                                    </motion.div>
                                                ) : null
                                            }
                                        </AnimatePresence>
                                        <AnimatePresence mode="popLayout">
                                            {
                                                values?.responsibilities?.some((item) => (item.level === "branch") && !!item?.department_id) ? (
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-2">
                                                        <span className="input--label">Sections</span>
                                                        <AnimatePresence mode="popLayout" initial={false}>
                                                        {
                                                            values?.responsibilities?.filter((item) => item?.level === "section").map((childItem) =>
                                                                <motion.div key={childItem.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                                                                    <div className="grid flex-1">
                                                                        <BaseSelectInput label="Section name" options={deptSections} {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_id` as any)} />
                                                                    </div>
                                                                    <div className="grid flex-1">
                                                                        <BaseInput type="number" label="Assigned Weight" className="hide-number-input-arrows" {...register(`responsibilities.${values.responsibilities.indexOf(childItem)}.department_weight` as any)} />
                                                                    </div>
                                                                    <div className="pt-6">
                                                                        <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(childItem.id, "section")}>Remove</BaseButton>
                                                                    </div>
                                                                </motion.div>
                                                            )
                                                        }
                                                        </AnimatePresence>
                                                        <AnimatePresence mode="popLayout" initial={false}>
                                                        {
                                                            (errors.responsibilities && (typeof errors.responsibilities === "string")) ? (
                                                                <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{errors.responsibilities}</motion.span>
                                                            ) : null
                                                        }
                                                        </AnimatePresence>
                                                        <motion.div layout animate={{ width: values?.responsibilities?.filter((item) => item?.level === "section").length > 0 ? "fit-content" : "100%" }} className="flex items-center justify-end ml-auto">
                                                            <Button type="button" className="flex flex-1 items-center justify-center gap-2 p-3 rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => setFieldValue("responsibilities", [...values.responsibilities, addChildren("section")])}>
                                                                Add section
                                                                <Icon icon={riAddFill} width={16} height={16} />
                                                            </Button>
                                                        </motion.div>
                                                    </motion.div>
                                                ) : null
                                            }
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" loading={isPending} disabled={!isValid || isPending} block>Create sub-initiative</BaseButton>
                        </form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}