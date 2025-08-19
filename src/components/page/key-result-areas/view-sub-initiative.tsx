import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseCheckbox, BaseInput } from "@/components/core"
import type { FetchedSubInitiative } from "@/types/sub-initiative"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"

interface ViewSubInitiativeProps {
    item: FetchedSubInitiative;
    isOpen: boolean;
    close: () => void;
}

export const ViewSubInitiative: FC<ViewSubInitiativeProps> = ({ isOpen, item, close }) => {
    const { register } = useFormikWrapper({
        initialValues: {
            ...item
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
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">{item?.name}</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => close()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Name of sub-initiative" type="text" {...register("name")} readOnly />
                                    <BaseInput label="Graded Weight" type="text" {...register("graded_weight")} readOnly />
                                    <BaseInput label="Assigned Weight" type="text" {...register("assigned_weight")} readOnly />
                                    <BaseInput label="Target" type="text" {...register("target")} readOnly />
                                    <BaseInput label="KPI" type="text" {...register("kpi")} readOnly />
                                    <BaseInput label="KPI’s Unit of Measurement" type="text" {...register("unit_of_measurement.name" as any)} readOnly />
                                    {/* <BaseInput label="KPI’s Measurement" type="text"  /> */}
                                    <BaseInput label="Status" type="text" />
                                    <div className="grid gap-4">
                                        <span className="input--label">This sub-initiative is assigned to</span>
                                        <div className="flex items-center gap-14">
                                            <BaseCheckbox label={<span className="font-medium text-grey-40 text-sm">Department-Division</span>} />
                                            <BaseCheckbox label={<span className="font-medium text-grey-40 text-sm">Department-Branch</span>} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}