import { FC } from "react"
import { Drawer } from "vaul"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import { BaseButton, BaseInput, BaseSelectInput, RenderIf } from "@/components/core"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import type { FetchedAssignmentType } from "@/types/assignment"
import { useGetAssignment, useGetSubInitiative } from "@/services/hooks/queries"
import { useMarkAssignmentDone } from "@/services/hooks/mutations"
import { getMarkAssignmentDoneSchema } from "@/validations/assignment"
import { Loader } from "@/components/core/Button/Loader"

interface MarkEmployeeTaskProps {
    isOpen: boolean;
    close: () => void;
    task: FetchedAssignmentType;
}

export const MarkEmployeeTask: FC<MarkEmployeeTaskProps> = ({ isOpen, close, task }) => {
    const { data: subInitiative, isLoading: loadinSubIni } = useGetSubInitiative(task?.sub_initiative_id?.toString())
    const { data: assignment, isLoading: loadingAssignment } = useGetAssignment(task?.id?.toString() as string)
    const { mutate, isPending } = useMarkAssignmentDone(() => {
        close()
    })

    const measurementType = subInitiative?.unit_of_measurement?.name?.toLowerCase() === "date" ? "date" : "number"
    
    const { handleSubmit, isValid, register, values } = useFormikWrapper({
        initialValues: {
            achieved: "",
            graded_weight: task?.sub_initiative?.graded_weight || "",
            assigned_weight: task?.sub_initiative?.assigned_weight || "",
            target: task?.sub_initiative?.target || "",
            status: assignment?.status || "",
        },
        enableReinitialize: true,
        validationSchema: getMarkAssignmentDoneSchema(measurementType),
        onSubmit() {
            mutate({ id: assignment?.id as number, achieved: values?.achieved?.toString() })
        },
    })
    // const scoreCategory = useMemo(() => {
    //     const score = parseInt(values?.achieved)
    //     if (score >= 81 && score <= 100) return "Outstanding";
    //     if (score >= 71 && score <= 80) return "Excellent";
    //     if (score >= 61 && score <= 70) return "Very Good";
    //     if (score >= 51 && score <= 60) return "Good";
    //     if (score >= 41 && score <= 50) return "Fail";
    //     return "Pass";
    // }, [values?.achieved]);
    

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
                        <RenderIf condition={!loadinSubIni && !loadingAssignment}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                                <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide">
                                    <div className="flex items-start justify-between gap-2">
                                        <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">Task completion</Drawer.Title>
                                        <Button type="button" className="p-3" onClick={() => close()}>
                                            <Icon icon={riCloseFill} width={16} height={16} />
                                        </Button>
                                    </div>
                                    
                                    <div className="flex flex-col w-full gap-8">
                                        <div className="grid gap-4">
                                            <h2 className="font-semibold text-xl text-black">Task Score</h2>
                                            <div className="flex flex-col gap-8">
                                                <BaseInput label="Achieved Task KPI" type={measurementType} min={measurementType === "number" ? 0 : undefined} max={measurementType === "number" ? 100 : undefined} {...register("achieved")} />
                                                {/* <BaseInput label="Achieved grade value" type="text" value={values?.achieved === "" ? "" : scoreCategory} disabled /> */}
                                            </div>
                                        </div>
                                        <div className="grid gap-4">
                                            <h2 className="font-semibold text-xl text-black">Task Details</h2>
                                            <div className="flex flex-col gap-8">
                                                <BaseInput label="Assigned Staff" type="text" defaultValue={`${task?.user?.first_name} ${task?.user?.last_name}`} disabled />
                                                <BaseInput label="Sub Initiatives" type="text" defaultValue={subInitiative?.name} disabled />
                                                <BaseInput label="Assigned Weight" type="text" defaultValue={subInitiative?.assigned_weight} disabled />
                                                <BaseInput label="Graded Weight" type="text" defaultValue={subInitiative?.graded_weight} disabled />
                                                <BaseInput label="KPIs" type="text" defaultValue={subInitiative?.kpi} disabled />
                                                <BaseInput label="Unit of Measurement" type="text" defaultValue={subInitiative?.unit_of_measurement?.name} disabled />
                                                <BaseInput label="Target KPI" type="text" {...register("target")} disabled />
                                                <BaseSelectInput label="Status" options={[{ label: "Active", value: "active" }, { label: "Done", value: "done" }]} {...register("status")} disabled />
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
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">O</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignment?.criteria?.outstanding_min} - {assignment?.criteria?.outstanding_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">E</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignment?.criteria?.excellent_min} - {assignment?.criteria?.excellent_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">VG</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignment?.criteria?.very_good_min} - {assignment?.criteria?.very_good_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">G</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignment?.criteria?.good_min} - {assignment?.criteria?.good_max}</td>
                                                        </tr>
                                                        <tr className="border-b border-b-[#DFE2E7]">
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">F</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignment?.criteria?.fair_min} - {assignment?.criteria?.fair_max}</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">P</td>
                                                            <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">{assignment?.criteria?.pass_min} - {assignment?.criteria?.pass_max}</td>
                                                        </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <BaseButton type="submit" size="small" theme="primary" variant="filled" loading={isPending} disabled={!isValid || isPending} block>Mark as done</BaseButton>
                            </form>
                        </RenderIf>
                        <RenderIf condition={loadinSubIni || loadingAssignment}>
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