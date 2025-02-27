import { useParams } from "react-router"
import DatePicker from "react-datepicker"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"
import { BaseInput, TextArea } from "@/components/core"
import { useGetKRA } from "@/services/hooks/queries"
import { useFormikWrapper } from "@/hooks/useFormikWrapper"

export const KraOverviewPage = () => {
    const { id } = useParams()
    const { data } = useGetKRA(id as string)

    const { register } = useFormikWrapper({
        initialValues: {
            ...data
        },
        enableReinitialize: true,
        onSubmit: () => {}
    })
    return (
        <div className="flex border border-[#DFE2E7] rounded-lg px-6 pt-3 pb-12">
            <div className="grid grid-cols-2 w-full gap-8 content-start">
                <BaseInput label="Name" type="text" {...register("name")} readOnly />
                <BaseInput label="Budget Allocation" type="text" iconLeft="mdi:naira" {...register("budget_allocation")} readOnly />
                <BaseInput label="Weight" type="text" {...register("weight")} readOnly />
                <BaseInput label="Budget Released" type="text" iconLeft="mdi:naira" {...register("budget_released")} readOnly />
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
                
                <BaseInput label="Donor Funding" type="text" iconLeft="mdi:naira" {...register("donor_funding")} readOnly />
                <div className="grid">
                    <TextArea label="Description" rows={5} {...register("description")} readOnly />
                </div>
                <BaseInput label="Other Sources" type="text" iconLeft="mdi:naira" {...register("other_sources")} readOnly />
            </div>
        </div>
    )
}