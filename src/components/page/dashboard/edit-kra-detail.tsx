import { FC } from "react"
import { Drawer } from "vaul"
import DatePicker from "react-datepicker"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"
import { BaseButton, BaseInput, TextArea } from "@/components/core"

interface EditKraDetailProps {
    isOpen: boolean;
    close: () => void;
}

export const EditKraDetail: FC<EditKraDetailProps> = ({ isOpen, close }) => {
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
                        <form className="flex flex-col gap-14 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-8 overflow-y-scroll scrollbar-hide" style={{ height: "calc(100dvh - 124px)"}}>
                                <div className="flex items-center justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900">Edit a Key Result Area</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-8">
                                    <BaseInput label="Name of Objective" type="text" />
                                    <TextArea label="Description" />
                                    <div className="grid grid-cols-2 content-start gap-4">
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
                                    <BaseInput label="Budget Allocation" type="text" />
                                    <BaseInput label="Budget Released" type="text" />
                                    <BaseInput label="Donor Funding" type="text" />
                                    <BaseInput label="Other Sources" type="text" />
                                    <BaseInput label="KRA Weight" type="text" />
                                    <div className="grid grid-cols-2 content-start gap-4">
                                        <div className="grid">
                                            <BaseInput label="Name of Objective" type="text" />
                                        </div>
                                        <div className="grid">
                                            <BaseInput label="Name of Objective" type="text" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" block>Create sub-initiative</BaseButton>
                        </form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}