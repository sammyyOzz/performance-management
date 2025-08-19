import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput, RenderIf } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import type { FetchedAssignmentType } from "@/types/assignment"
import { useGetAssignment, useGetSubInitiative } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { useEditSubInitiative } from "@/services/hooks/mutations"
import { FetchedSingleSubInitiative } from "@/types/sub-initiative"

interface EditEmployeeTaskProps {
    isOpen: boolean;
    close: () => void;
    task: FetchedAssignmentType
}

export const EditEmployeeTask: FC<EditEmployeeTaskProps> = ({ isOpen, close, task }) => {
    const { data: assignmentData, isLoading: isAssignmentLoading } = useGetAssignment(task?.id?.toString());

    const { mutate, isPending } = useEditSubInitiative(() => {
        close()
        console.clear()
    })
    const { data: subInitiative, isLoading } = useGetSubInitiative(task?.sub_initiative_id?.toString())
        
    const { handleSubmit, isValid, register } = useFormikWrapper({
        initialValues: {
            target: subInitiative?.target || "",
        },
        enableReinitialize: true,
        onSubmit(values) {
            const { id, target, ...rest } = subInitiative as FetchedSingleSubInitiative
            mutate({ ...rest, target: values.target, id: id?.toString() })
            console.log(target)
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
                        <RenderIf condition={!isLoading || !isAssignmentLoading}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                                <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
                                    <div className="flex items-start justify-between gap-2">
                                        <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">{task?.sub_initiative?.name}</Drawer.Title>
                                        <Button type="button" className="p-3" onClick={() => close()}>
                                            <Icon icon={riCloseFill} width={16} height={16} />
                                        </Button>
                                    </div>
                                    
                                    <div className="flex flex-col w-full gap-5">
                                        <BaseInput label="Assigned Staff" type="text" defaultValue={`${task?.user?.first_name} ${task?.user?.last_name}`} disabled />
                                        <BaseInput label="Sub Initiatives" type="text" defaultValue={subInitiative?.name} disabled />
                                        <BaseInput label="Assigned Weight" type="text" defaultValue={subInitiative?.assigned_weight} disabled />
                                        <BaseInput label="Graded Weight" type="text" defaultValue={task?.graded_weight} disabled />
                                        <BaseInput label="KPIs" type="text" defaultValue={subInitiative?.kpi} disabled />
                                        <BaseInput label="Unit of Measurement" type="text" defaultValue={subInitiative?.unit_of_measurement?.name} disabled />
                                        <BaseInput label="Target KPI" type="text" {...register("target")} />
                                        <div className="grid gap-1">
                                            <span className="input--label">Criteria Value</span>
                                            <div className="grid border border-[#DFE2E7] rounded-xl overflow-hidden">
                                                <table className="table-auto border-collapse">
                                                    <thead>
                                                        <tr className="bg-[#F5F6F7]">
                                                            <th className="text-sm font-normal text-grey-40 text-left py-2 px-3">Grade</th>
                                                            <th className="text-sm font-normal text-grey-40 text-left py-2 px-3">Score</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">O</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignmentData?.criteria?.outstanding_min} - {assignmentData?.criteria?.outstanding_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">E</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignmentData?.criteria?.excellent_min} - {assignmentData?.criteria?.excellent_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">VG</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignmentData?.criteria?.very_good_min} - {assignmentData?.criteria?.very_good_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">G</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignmentData?.criteria?.good_min} - {assignmentData?.criteria?.good_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">F</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignmentData?.criteria?.fair_min} - {assignmentData?.criteria?.fair_max}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">P</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignmentData?.criteria?.pass_min} - {assignmentData?.criteria?.pass_max}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <BaseButton type="submit" size="small" theme="primary" variant="filled" loading={isPending} disabled={!isValid || isPending} block>Save Changes</BaseButton>
                            </form>
                        </RenderIf>
                        <RenderIf condition={isLoading || isAssignmentLoading}>
                            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
                                <Loader className="spinner size-6 text-green-primary-40" />
                            </div>
                        </RenderIf>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}