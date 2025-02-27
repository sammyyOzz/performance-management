import { cn } from "@/lib/utils"
import { useId, useState } from "react"
import riAddFill from "@iconify-icons/ri/add-fill"
import { Button } from "@headlessui/react"
import { Icon } from "@iconify-icon/react"
import { useNavigate } from "react-router"
import riErrorWarningLine from "@iconify-icons/ri/error-warning-line"
import { AnimatePresence, motion } from "motion/react"
import { useCreateKra } from "@/services/hooks/mutations"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { createKRAStepOneSchema, createKRAStepTwoSchema } from "@/validations/kra"
import { BaseButton, BaseInput, BaseSelectInput, Breadcrumb } from "@/components/core"

const steps = [
    { label: "Key Result Area Overview", description: "Fill out these details about KRA" },
    { label: "Weight and Responsibility", description: "Set the KRA weight and assign responsibility" }
]

export const CreateDashboardKraPage = () => {
    const uniqueId = useId()
    const navigate = useNavigate()
    const { mutate, isPending } = useCreateKra(() => navigate("/dashboard/kra"))
    const [currentStep, setCurrentStep] = useState(0)
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create a KRA", href: "/dashboard/kra/create" },
    ]
    const stepOneForm = useFormikWrapper({
        initialValues: {
            name: "",
            description: "",
            budget_allocation: "",
            budget_released: "",
            donor_funding: "",
            other_sources: "",
        },
        validationSchema: createKRAStepOneSchema,
        onSubmit() {
            setCurrentStep(1)
        },
    })
    const stepTwoForm = useFormikWrapper({
        initialValues: {
            weight: "",
            responsibilities: [
                { department_id: "", department_weight: "", id: `${uniqueId}-0` }
            ]
        },
        validationSchema: createKRAStepTwoSchema,
        onSubmit(values) {
            if (!isPending && stepTwoForm.isValid) {
                const newResponsibilities = values.responsibilities.map((item) => ({ department_id: parseInt(item.department_id), department_weight: parseInt(item.department_weight) }))
                mutate({ ...stepOneForm.values, weight: parseInt(values.weight), responsibilities: newResponsibilities })
            }
        },
    })
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-14 max-w-screen-2xl mx-auto">
                <Breadcrumb items={breadcrumbs} />
                <div className="relative flex items-start justify-center gap-8">
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
                    <motion.div className="flex flex-col max-w-[42.4375rem] w-full border border-[#E6E6E6] rounded-lg mb-9">
                        <motion.div className="flex flex-col gap-8 p-8">
                            <AnimatePresence mode="popLayout">
                                {
                                    currentStep === 0 ? (
                                        <KeyResultArea formik={stepOneForm} />
                                    ) : ( <WeightAndResponsibility formik={stepTwoForm} /> )
                                }
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                {
                                    currentStep === 0 ? (
                                        <motion.div layout key="next">
                                            <BaseButton type="submit" size="small" theme="primary" variant="filled" form="first-step" disabled={!stepOneForm.isValid || isPending} block>Next</BaseButton>
                                        </motion.div>
                                        
                                    ) : (
                                        <motion.div layout key="create" className="flex items-center gap-5 pt-16">
                                            <BaseButton size="small" theme="primary" variant="ghost" disabled={isPending} onClick={() => setCurrentStep(0)} block>Back</BaseButton>
                                            <motion.div className="w-full">
                                                <BaseButton type="submit" size="small" theme="primary" variant="filled" form="second-step" loading={isPending} disabled={!stepTwoForm.isValid || isPending} block>Create KRA</BaseButton> 
                                            </motion.div>
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

const KeyResultArea = ({ formik }: { formik: any }) => {
    return (
        <motion.form id="first-step" onSubmit={formik.handleSubmit} layout className="flex flex-col items-center flex-1 gap-8">
            <h1 className="font-semibold text-2xl text-gray-900">Create a Key Result Area</h1>
            <BaseInput type="text" label="Name of Objective" {...formik.register("name")} />
            <BaseInput type="text" label="Description" {...formik.register("description")} />
            <BaseInput type="number" label="Budget Allocation" {...formik.register("budget_allocation")} placeholder="₦0" className="hide-number-input-arrows" />
            <BaseInput type="number" label="Budget Released" {...formik.register("budget_released")} placeholder="₦0" className="hide-number-input-arrows" />
            <BaseInput type="number" label="Donor Funding" {...formik.register("donor_funding")} placeholder="₦0" className="hide-number-input-arrows" />
            <BaseInput type="number" label="Other Sources" {...formik.register("other_sources")} placeholder="₦0" className="hide-number-input-arrows" />
        </motion.form>
    )
}

const WeightAndResponsibility = ({ formik }: { formik: any }) => {
    const idPrefix = useId()
    const addResponsibility = () => {
        return { 
            department_id: "", 
            department_weight: "", 
            id: `${idPrefix}-${formik.values.responsibilities.length}`
        }
    }
    const removeResponsibility = (index: number) => {
        const responsibilities = [...formik.values.responsibilities] as Array<ReturnType<typeof addResponsibility>>
        responsibilities.splice(index, 1);
        formik.setFieldValue("responsibilities", responsibilities)
    }
    const departments = [
        { label: "Human Resource", value: 0 }
    ]
    return (
        <form id="second-step" onSubmit={formik.handleSubmit} className="flex flex-col items-center flex-1 gap-8">
            <h1 className="font-semibold text-2xl text-gray-900">Weight and Responsibility</h1>
            <div className="flex flex-col gap-4 w-full">
                <BaseInput type="number" className="hide-number-input-arrows" label="KRA Weight" {...formik.register("weight")} />
                <div className="flex items-center gap-3 p-3 bg-green-secondary-10 text-green-secondary-40 rounded">
                    <Icon icon={riErrorWarningLine} width={14} height={14} />
                    <span className="font-medium text-xs">The combined weight of all departments should match the weight assigned to that KRA.</span>
                </div>
            </div>
            <div className="grid gap-4 w-full">
                <motion.h2 layout className="mr-auto font-semibold text-sm text-grey-40">Set Responsibility</motion.h2>
                <AnimatePresence mode="popLayout" initial={false}>
                {
                    formik.values.responsibilities.map((responsibility: ReturnType<typeof addResponsibility>, index: number) =>
                        <motion.div key={responsibility.id} layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }} className="flex gap-4">
                            <div className="grid flex-1">
                                <BaseSelectInput label="Select Department" options={departments} {...formik.register(`responsibilities.${index}.department_id`)} />
                            </div>
                            <div className="grid flex-1">
                                <BaseInput type="number" label="Assigned Weight" className="hide-number-input-arrows" {...formik.register(`responsibilities.${index}.department_weight`)} />
                            </div>
                            <div className="pt-6">
                                <BaseButton type="button" size="small" theme="danger" variant="filled" onClick={() => removeResponsibility(index)}>Remove</BaseButton>
                            </div>
                        </motion.div>
                    )
                }
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                {
                    (formik.errors.responsibilities && (typeof formik.errors.responsibilities === "string")) ? (
                        <motion.span className="input--error" layout initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -5, opacity: 0 }} transition={{ type: "spring", bounce: 0 }}>{formik.errors.responsibilities}</motion.span>
                    ) : null
                }
                </AnimatePresence>
                <motion.div layout>
                    <Button type="button" className="flex items-center justify-center gap-2 p-3 w-fit rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40" onClick={() => formik.setFieldValue("responsibilities", [...formik.values.responsibilities, addResponsibility()])}>
                        Add department
                        <Icon icon={riAddFill} width={16} height={16} />
                    </Button>
                </motion.div>
            </div>
        </form>
    )
}