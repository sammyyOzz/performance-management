import { FC } from "react"
import { Information } from "iconsax-react"
import { BaseButton } from "@/components/core"
import { FetchedUserType } from "@/types/user";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"

interface EmployeeImprovementPlanProps {
    isOpen: boolean;
    close: () => void;
    onAssign: () => void;
    user: FetchedUserType;
}

export const EmployeeImprovementPlan: FC<EmployeeImprovementPlanProps> = ({ isOpen, close, onAssign }) => {
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 bg-black/10 duration-300 ease-out transition-all" style={{ backdropFilter: "blur(4px)", willChange: "transform" }} /> 
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel transition className="flex flex-col gap-8 items-center w-full max-w-[31.125rem] rounded-xl bg-white-10 p-8 ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-100">
                        <div className="size-24 grid place-content-center bg-red-10 rounded-full">
                            <Information size="48" color="#D42620"/>
                        </div>
                        <p className="text-xl font-medium text-grey-40 text-center">
                            This employee underperformed this month, so they will be placed on an improvement plan. Please click the button below to assign them.
                        </p>
                        <div className="flex items-center gap-5 w-full">
                            <BaseButton size="small" theme="danger" variant="filled" onClick={() => onAssign()} block>
                                Assign employee to improvement plan
                            </BaseButton>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}