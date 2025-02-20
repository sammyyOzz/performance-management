import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput } from "@/components/core"

interface EditObjectiveProps {
    isOpen: boolean;
    close: () => void;
}

export const EditObjective: FC<EditObjectiveProps> = ({ isOpen, close }) => {
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
                        <div className="relative flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col flex-1 gap-4 overflow-y-scroll scrollbar-hide">
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Edit Objective</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Name of Objective" type="text" />
                                    <BaseInput label="Graded Weight" type="text" />
                                    <BaseInput label="Assigned Weight" type="text" />
                                    <BaseInput label="Responsibility" type="text" />
                                    <BaseInput label="Target" type="text" />
                                    <BaseInput label="KPI" type="text" />
                                    <BaseInput label="KPI’s Unit of Measurement" type="text" />
                                    <BaseInput label="KPI’s Measurement" type="text" />
                                    <BaseInput label="Status" type="text" />
                                </div>
                            </div>
                                <BaseButton type="submit" size="small" theme="primary" variant="filled" block>Save Changes</BaseButton>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}