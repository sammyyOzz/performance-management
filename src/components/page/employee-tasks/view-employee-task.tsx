import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseInput } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { FetchedAssignmentType } from "@/types/assignment"

interface ViewEmployeeTaskProps {
    isOpen: boolean;
    close: () => void;
    employeeTask: FetchedAssignmentType | null;
}

export const ViewEmployeeTask: FC<ViewEmployeeTaskProps> = ({ isOpen, close, employeeTask }) => {
    const { register, values } = useFormikWrapper({
        initialValues: {
            name: employeeTask?.sub_initiative?.name || "",
            graded_weight: employeeTask?.sub_initiative?.graded_weight || "",
            assigned_weight: employeeTask?.sub_initiative?.assigned_weight || "",
            target: employeeTask?.sub_initiative?.target || "",
            kpi: employeeTask?.sub_initiative?.kpi || "",
            unit_of_measurement: employeeTask?.sub_initiative?.unit_of_measurement?.name || "",
            status: employeeTask?.status || "",
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
                                <div className="flex items-start justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">{values?.name}</Drawer.Title>
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
                                    <BaseInput label="KPI’s Unit of Measurement" type="text" {...register("unit_of_measurement")} readOnly />
                                    <BaseInput label="Status" type="text" {...register("status")} readOnly />
                                    <div className="grid gap-1">
                                        <span className="input--label">Criteria Value</span>
                                        <div className="grid border border-[#DFE2E7] rounded-xl overflow-hidden">
                                            <table className="table-auto border-collapse">
                                                <thead>
                                                    <tr className="bg-[#F5F6F7]">
                                                        <th className="text-sm font-normal text-grey-40 text-left py-2 px-3">Grade</th>
                                                        <th className="text-sm font-normal text-grey-40 text-left py-2 px-3">Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">0=100</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">24</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">E=80</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">20</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">VG=70</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">16</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">G=60</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">12</td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">F=50</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">8</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">P=40</td>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">4</td>
                                                    </tr>
                                                </tbody>
                                            </table>
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