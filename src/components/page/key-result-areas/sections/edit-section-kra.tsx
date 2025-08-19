import { FC } from "react"
import { Drawer } from "vaul"
import riAddFill from "@iconify-icons/ri/add-fill"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput } from "@/components/core"
import { FetchedSubInitiative } from "@/types/sub-initiative"
import { FetchedDepartmentType } from "@/types/department"

interface EditSectionsKraProps {
    isOpen: boolean;
    close: () => void;
    kra: FetchedSubInitiative | null;
    department: FetchedDepartmentType | null;
}

export const EditSectionsKra: FC<EditSectionsKraProps> = ({ isOpen, close, kra, department }) => {
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
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Edit Sections KRA</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Name of KRA" type="text" defaultValue={kra?.name || ''} />
                                    <BaseInput label="Departmental Weight" type="text" defaultValue={kra?.graded_weight || ''} />
                                    <div className="flex flex-col gap-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <BaseInput label="Responsibility" type="text" defaultValue={department?.name || ''} />
                                            <BaseInput label="Assigned Weight" type="text" defaultValue={kra?.assigned_weight || ''} />
                                        </div>
                                        <Button type="button" className="flex items-center justify-center gap-2 p-3 w-fit ml-auto rounded-lg border border-[#F0F1F4] bg-[#F5F6F7] text-xs text-grey-40">
                                            Add Sections
                                            <Icon icon={riAddFill} width={16} height={16} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" block>Save changes</BaseButton>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}