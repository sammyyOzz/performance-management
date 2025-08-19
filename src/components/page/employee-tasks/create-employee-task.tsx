import { Drawer } from "vaul"
import { FC, useEffect, useMemo, useState } from "react"
import { Icon } from "@iconify-icon/react"
import { Button } from "@headlessui/react"
import riCloseFill from "@iconify-icons/ri/close-fill"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"
import DatePicker from "react-datepicker"
import { FetchedUserType } from "@/types/user"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"
import { useGetSubInitiatives } from "@/services/hooks/queries"
import { useCreateAssignment } from "@/services/hooks/mutations"
import { CriteriaMode, getCreateEmployeeTaskSchema } from "@/validations/assignment"
import { BaseButton, BaseInput, BaseSelectInput } from "@/components/core"
import "@/components/core/Input/scrollbar.css"

interface CreateEmployeeTaskProps {
    isOpen: boolean;
    close: () => void;
    user: FetchedUserType;
}

export const CreateEmployeeTask: FC<CreateEmployeeTaskProps> = ({ isOpen, close, user }) => {
    const { mutate, isPending } = useCreateAssignment(() => onClose())
    const { data: subInitiatives } = useGetSubInitiatives({ page_size: Number.MAX_SAFE_INTEGER, department_id: [user?.department_id, user?.division_id, user?.branch_id, user?.section_id] }, { enabled: !!user?.id })
    
    const [criteriaMode, setCriteriaMode] = useState<CriteriaMode>("number");

    const fetchedSubIni = useMemo(() => {
        return subInitiatives?.map((item) => ({ label: item?.name, value: item?.id?.toString() })) || []
    }, [subInitiatives])
    
    const { handleSubmit, register, resetForm, values, setFieldValue } = useFormikWrapper({
        initialValues: {
            name: `${user?.first_name || ""} ${user?.last_name || ""}`,
            sub_initiative_id: "",
            weight: 0,
            graded_weight: 0,
            // user_id: user?.id || "",
            excellent_max: "",
            excellent_min: "",
            fair_max: "",
            fair_min: "",
            good_max: "",
            good_min: "",
            outstanding_max: "",
            outstanding_min: "",
            pass_max: "",
            pass_min: "",
            very_good_max: "",
            very_good_min: "",
            expected_delivery_date: "",
        },
        enableReinitialize: true,
        validationSchema: getCreateEmployeeTaskSchema(criteriaMode),
        onSubmit: () => {
            mutate({
                sub_initiative_id: parseInt(values?.sub_initiative_id),
                weight: values?.weight,
                graded_weight: (Number(selectedSubIni?.assigned_weight || 0) * values.weight) / 100,
                user_id: user?.id,
                expected_delivery_date: values.expected_delivery_date,
                create_criteria: {
                    excellent_max: values.excellent_max,
                    excellent_min: values.excellent_min,
                    fair_max: values.fair_max,
                    fair_min: values.fair_min,
                    good_max: values.good_max,
                    good_min: values.good_min,
                    outstanding_max: values.outstanding_max,
                    outstanding_min: values.outstanding_min,
                    pass_max: values.pass_max,
                    pass_min: values.pass_min,
                    very_good_max: values.very_good_max,
                    very_good_min: values.very_good_min
                }
            })
        },
    })

    const selectedSubIni = useMemo(() => {
        return subInitiatives?.filter((item) => item?.id?.toString() === values?.sub_initiative_id?.toString())?.[0]
    }, [subInitiatives, values?.sub_initiative_id])

    useEffect(() => {
        setCriteriaMode((selectedSubIni?.unit_of_measurement?.name || "number") as CriteriaMode)
    }, [selectedSubIni?.unit_of_measurement?.name])
    
    const onClose = () => {
        close();
        resetForm()
    }

    return (
        <Drawer.Root open={isOpen} onOpenChange={onClose} direction="right">
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/10" style={{ backdropFilter: "blur(4px)" }} />
                <Drawer.Content
                className="right-0 top-0 bottom-0 fixed z-10 outline-none w-full max-w-[41.8125rem] flex"
                // The gap between the edge of the screen and the drawer is 8px in this case.
                style={{ "--initial-transform": "calc(100% + 0px)" } as React.CSSProperties}
                >
                    <div className="bg-white-10 h-full w-full grow p-6 flex flex-col rounded-bl-lg">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full w-full max-w-2xl mx-auto">
                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2">
                                <div className="flex items-start justify-between gap-2">
                                    <Drawer.Title className="font-semibold text-2xl text-gray-900 capitalize">Create task</Drawer.Title>
                                    <Button type="button" className="p-3" onClick={() => onClose()}>
                                        <Icon icon={riCloseFill} width={16} height={16} />
                                    </Button>
                                </div>
                                
                                <div className="flex flex-col w-full gap-5">
                                    <BaseInput label="Assigned Staff" type="text" {...register("name")} disabled />
                                    <BaseSelectInput label="Sub Initiatives" options={fetchedSubIni} {...register("sub_initiative_id")} />
                                    <BaseInput label="Sub Initiative Weight" type="text" defaultValue={selectedSubIni?.assigned_weight} readOnly />
                                    <BaseInput label="Assigned Weight" type="number" {...register("weight")} />
                                    <BaseInput label="Graded Weight" type="text" value={(Number(selectedSubIni?.assigned_weight || 0) * values.weight) / 100} readOnly />
                                    <BaseInput label="KPIs" type="text" defaultValue={selectedSubIni?.kpi} readOnly />
                                    <BaseInput label="Unit of Measurement" type="text" defaultValue={selectedSubIni?.unit_of_measurement?.name} readOnly />
                                    <BaseInput label="Target KPI" type="text" defaultValue={selectedSubIni?.target} readOnly />
                                    <DatePicker
                                        selected={values.expected_delivery_date ? new Date(values.expected_delivery_date) : null}
                                        onChange={(date) => setFieldValue("expected_delivery_date", date ? date.toISOString().split('T')[0] : "")}
                                        dateFormat="yyyy-MM-dd"
                                        customInput={<BaseInput label="Expected Delivery Date" type="text" iconRight={riCalendar2Line} />}
                                    />
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
                                                        <td className="flex items-center gap-5 text-sm font-normal text-grey-40 text-left py-2 px-3">
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("outstanding_min")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.outstanding_min ? new Date(values.outstanding_min) : null}
                                                                    onChange={(date) => setFieldValue("outstanding_min", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                            -
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("outstanding_max")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.outstanding_max ? new Date(values.outstanding_max) : null}
                                                                    onChange={(date) => setFieldValue("outstanding_max", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">E</td>
                                                        <td className="flex items-center gap-5 text-sm font-normal text-grey-40 text-left py-2 px-3">
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("excellent_min")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.excellent_min ? new Date(values.excellent_min) : null}
                                                                    onChange={(date) => setFieldValue("excellent_min", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                            -
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("excellent_max")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.excellent_max ? new Date(values.excellent_max) : null}
                                                                    onChange={(date) => setFieldValue("excellent_max", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">VG</td>
                                                        <td className="flex items-center gap-5 text-sm font-normal text-grey-40 text-left py-2 px-3">
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("very_good_min")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.very_good_min ? new Date(values.very_good_min) : null}
                                                                    onChange={(date) => setFieldValue("very_good_min", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                            -
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("very_good_max")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.very_good_max ? new Date(values.very_good_max) : null}
                                                                    onChange={(date) => setFieldValue("very_good_max", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">G</td>
                                                        <td className="flex items-center gap-5 text-sm font-normal text-grey-40 text-left py-2 px-3">
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("good_min")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.good_min ? new Date(values.good_min) : null}
                                                                    onChange={(date) => setFieldValue("good_min", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                            -
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("good_max")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.good_max ? new Date(values.good_max) : null}
                                                                    onChange={(date) => setFieldValue("good_max", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr className="border-b border-b-[#DFE2E7]">
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">F</td>
                                                        <td className="flex items-center gap-5 text-sm font-normal text-grey-40 text-left py-2 px-3">
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("fair_min")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.fair_min ? new Date(values.fair_min) : null}
                                                                    onChange={(date) => setFieldValue("fair_min", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                            -
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("fair_max")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.fair_max ? new Date(values.fair_max) : null}
                                                                    onChange={(date) => setFieldValue("fair_max", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-sm font-normal text-grey-40 text-left py-2 px-3">P</td>
                                                        <td className="flex items-center gap-5 text-sm font-normal text-grey-40 text-left py-2 px-3">
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("pass_min")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.pass_min ? new Date(values.pass_min) : null}
                                                                    onChange={(date) => setFieldValue("pass_min", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                            -
                                                            {criteriaMode === "number" ? (
                                                                <BaseInput type="text" className="h-10" {...register("pass_max")} />
                                                            ) : (
                                                                <DatePicker
                                                                    selected={values.pass_max ? new Date(values.pass_max) : null}
                                                                    onChange={(date) => setFieldValue("pass_max", date ? date.toISOString().split('T')[0] : "")}
                                                                    dateFormat="yyyy-MM-dd"
                                                                    customInput={<BaseInput type="text" className="h-10" iconRight={riCalendar2Line} />}
                                                                />
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <BaseButton type="submit" size="small" theme="primary" variant="filled" loading={isPending} disabled={isPending} block>Create Task</BaseButton>
                        </form>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    )
}