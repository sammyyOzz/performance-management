import { cn } from "@/lib/utils"
import { useState } from "react"
import DatePicker from "react-datepicker"
import riAddFill from "@iconify-icons/ri/add-fill"
import { Button } from "@headlessui/react"
import { Icon } from "@iconify-icon/react"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"
import riErrorWarningLine from "@iconify-icons/ri/error-warning-line"
import { AnimatePresence, motion } from "motion/react"
import { BaseButton, BaseInput, Breadcrumb } from "@/components/core"

const steps = [
    { label: "Key Result Area Overview", description: "Fill out these details about KRA" },
    { label: "Weight and Responsibility", description: "Set the KRA weight and assign responsibility" }
]

export const CreateDashboardKraPage = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create a KRA", href: "/dashboard/kra/create" },
    ]
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
                                        <KeyResultArea />
                                    ) : ( <WeightAndResponsibility /> )
                                }
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                                {
                                    currentStep === 0 ? (
                                        <motion.div layout key="next">
                                            <BaseButton size="small" theme="primary" variant="filled" onClick={() => setCurrentStep(1)} block>Next</BaseButton>
                                        </motion.div>
                                        
                                    ) : (
                                        <motion.div layout key="create" className="flex items-center gap-5 pt-16">
                                            <BaseButton size="small" theme="primary" variant="ghost" onClick={() => setCurrentStep(0)} block>Back</BaseButton>
                                            <motion.div className="w-full">
                                            <BaseButton size="small" theme="primary" variant="filled" onClick={() => setCurrentStep(0)} block>Create KRA</BaseButton> 
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

const KeyResultArea = () => {
    return (
        <motion.div layout className="flex flex-col items-center flex-1 gap-8">
            <h1 className="font-semibold text-2xl text-gray-900">Create a Key Result Area</h1>
            <BaseInput type="text" label="Name of Objective" />
            <BaseInput type="text" label="Description" />
            <div className="grid grid-cols-2 content-start w-full gap-4">
                <div className="grid">
                    <DatePicker
                        // selected={values?.date as any}
                        onChange={() => {}}
                        // minDate={add(new Date(), { days: 1 })}
                        dateFormat="yyyy-MM-dd"
                        customInput={<BaseInput label="Start Date" type="text" iconRight={riCalendar2Line} />}
                    />
                </div>
                <div className="grid">
                    <DatePicker
                        // selected={values?.date as any}
                        onChange={() => {}}
                        // minDate={add(new Date(), { days: 1 })}
                        dateFormat="yyyy-MM-dd"
                        customInput={<BaseInput label="End Date" type="text" iconRight={riCalendar2Line} />}
                    />
                </div>
            </div>
            <BaseInput type="text" label="Budget Allocation" />
            <BaseInput type="text" label="Budget Released" />
            <BaseInput type="text" label="Donor Funding" />
            <BaseInput type="text" label="Other Sources" />
        </motion.div>
    )
}

const WeightAndResponsibility = () => {
    return (
        <motion.div layout className="flex flex-col items-center flex-1 gap-8">
            <h1 className="font-semibold text-2xl text-gray-900">Weight and Responsibility</h1>
            <div className="flex flex-col gap-4 w-full">
                <BaseInput type="text" label="KRA Weight" />
                <div className="flex items-center gap-3 p-3 bg-green-secondary-10 text-green-secondary-40 rounded">
                    <Icon icon={riErrorWarningLine} width={14} height={14} />
                    <span className="font-medium text-xs">The combined weight of all departments should match the weight assigned to that KRA.</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
                <h2 className="mr-auto font-semibold text-sm text-grey-40">Set Responsibilty</h2>
                <div className="grid grid-cols-2 content-start w-full gap-4">
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="Start Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="End Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="Start Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="End Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="Start Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="End Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                </div>
                <Button type="button" className="flex items-center justify-center gap-2 p-3 w-fit rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40">
                    Add department
                    <Icon icon={riAddFill} width={16} height={16} />
                </Button>
            </div>
        </motion.div>
    )
}