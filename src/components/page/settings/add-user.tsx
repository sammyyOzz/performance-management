import { FC, useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@iconify-icon/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput } from "@/components/core"
import { Button, Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { InfoCircle } from "iconsax-react"
import useMeasure from "react-use-measure"

const steps = [
    { label: "Basic Details", description: "Input employee ID and email" },
    { label: "Employee Details", description: "Input more details about the employee" }
]

interface AddUserProps {
    isOpen: boolean;
    close: () => void;
}

export const AddUser: FC<AddUserProps> = ({ isOpen, close }) => {
    const [ref, bounds] = useMeasure()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [direction, setDirection] = useState<any>()

    const content = useMemo(() => {
        if (!isModalOpen) {
            return null
        }
        switch (currentStep) {
            case 0:
                return (
                    <>
                        <BaseInput
                            type="text"
                            label="Employee ID"
                        />
                        <BaseInput
                            type="text"
                            label="Employee Email"
                            help={
                                <div className="flex items-center gap-1 p-2 rounded font-medium text-xs text-green-secondary-40 bg-green-secondary-10">
                                    <InfoCircle size="14" color="#0F973D" />
                                    Note: Ensure the email inputted is correct for users will be invited via mail
                                </div>
                            }
                        />
                        <BaseButton size="small" theme="primary" variant="filled" onClick={() => {
                            setDirection(1)
                            setCurrentStep(1)
                        }} block>Next</BaseButton>
                    </>
                )
            case 1:
                return (
                    <>
                        <BaseInput type="text" label="Department" />
                        <BaseInput type="text" label="Employee Role" />
                        <BaseInput type="text" label="Designation" />
                        <BaseInput type="text" label="User Role" />
                        <BaseInput type="text" label="Reporting Manager" />
                        <div className="flex items-center w-full gap-5">
                            <BaseButton size="small" theme="primary" variant="ghost" onClick={() => {
                                setDirection(-1)
                                setCurrentStep(0)
                            }} block>Back</BaseButton>
                            <BaseButton size="small" theme="primary" variant="filled" onClick={() => setCurrentStep(0)} block>Create KRA</BaseButton> 
                        </div>
                    </>
                )
        }
    }, [currentStep, isModalOpen])

    useEffect(() => {
        setIsModalOpen(true)
    },[])
    
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 bg-[#FDFDFD] duration-300 ease-out transition-all" style={{ backdropFilter: "blur(4px)" }} /> 
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex flex-col min-h-full items-center justify-start gap-12 px-20">
                    <div className="flex items-center justify-between w-full py-8">
                        <h1 className="text-xl font-semibold text-gray-900">Add Users</h1>
                        <Button className="flex items-center py-3 px-5 gap-2 rounded-lg bg-[#F5F6F7] border border-[#F0F1F4]">
                            Close
                            <Icon icon={riCloseFill} width={20} height={20} />
                        </Button>
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