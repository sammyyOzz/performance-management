import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseInput } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { FetchedUserType } from "@/types/user"

interface ViewMemberProfileProps {
    isOpen: boolean;
    close: () => void;
    user: FetchedUserType;
}

export const ViewMemberProfile: FC<ViewMemberProfileProps> = ({ isOpen, close, user }) => {
    const { register, values } = useFormikWrapper({
        initialValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            gender: "",
            marital_status: "",
            email: user?.email || "",
            department: "",
            job_title: user?.position || "",
            role: "",
            phone: "",
        },
        enableReinitialize: true,
        onSubmit() {
            
        },
    })
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
                        <div className="flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">{values?.first_name} {values?.last_name}</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <BaseInput label="First Name" type="text" {...register("first_name")} readOnly />
                                        <BaseInput label="Last Name" type="text" {...register("last_name")} readOnly />
                                    </div>
                                    <BaseInput label="Gender" type="text" {...register("gender")} readOnly />
                                    <BaseInput label="Marital Status" type="text" {...register("marital_status")} readOnly />
                                    <BaseInput label="Email" type="text" {...register("email")} readOnly />
                                    <BaseInput label="Department" type="text" {...register("department")} readOnly />
                                    <BaseInput label="Job Title" type="text" {...register("job_title")} readOnly />
                                    <BaseInput label="User Role" type="text" {...register("role")} readOnly />
                                    <BaseInput label="Work Phone Number" type="text" {...register("phone")} readOnly />
                                </div>

                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}