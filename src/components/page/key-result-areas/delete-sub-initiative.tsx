import { FC } from "react"
import { Trash } from "iconsax-react"
import { BaseButton } from "@/components/core"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { useDeleteSubInitiative } from "@/services/hooks/mutations";

interface DeleteSubInitiativeProps {
    id: string;
    isOpen: boolean;
    close: () => void;
}

export const DeleteSubInitiative: FC<DeleteSubInitiativeProps> = ({ isOpen, close, id }) => {
    const { mutate, isPending } = useDeleteSubInitiative(() => close())
    return (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 bg-black/10 duration-300 ease-out transition-all" style={{ backdropFilter: "blur(4px)", willChange: "transform" }} /> 
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel transition className="flex flex-col gap-8 items-center w-full max-w-[31.125rem] rounded-xl bg-white-10 p-8 ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-100">
                        <div className="size-24 grid place-content-center bg-red-10 rounded-full">
                            <Trash size="48" color="#D42620"/>
                        </div>
                        <p className="text-xl font-medium text-grey-40 text-center px-8">
                            Are you sure you want to delete this sub-Initiative? This action cannot be undone
                        </p>
                        <div className="flex items-center gap-5 w-full">
                            <BaseButton size="small" theme="primary" variant="outlined" disabled={isPending} onClick={() => close()} block>
                                Cancel
                            </BaseButton>
                            <BaseButton size="small" theme="danger" variant="filled" loading={isPending} disabled={isPending} onClick={() => mutate(id)} block>
                                Remove
                            </BaseButton>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}