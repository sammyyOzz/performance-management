import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseInput } from "@/components/core"

interface ViewUserProfileProps {
    isOpen: boolean;
    close: () => void;
}

export const ViewUserProfile: FC<ViewUserProfileProps> = ({ isOpen, close }) => {
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
                        <div className="flex flex-col gap-14 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-8 overflow-y-scroll scrollbar-hide" style={{ height: "calc(100dvh - 124px)"}}>
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Aijay Solomon</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <div className="grid grid-cols-2 content-start gap-4">
                                        <div className="grid">
                                            <BaseInput label="First Name" type="text" />
                                        </div>
                                        <div className="grid">
                                            <BaseInput label="Last Name" type="text" />
                                        </div>
                                    </div>
                                    <BaseInput label="Gender" type="text" />
                                    <BaseInput label="Marital Status" type="text" />
                                    <BaseInput label="Email" type="text" />
                                    <BaseInput label="Department" type="text" />
                                    <BaseInput label="Job Role" type="text" />
                                    <BaseInput label="Role" type="text" />
                                    <BaseInput label="Work Phone Number" type="text" />
                                </div>

                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}