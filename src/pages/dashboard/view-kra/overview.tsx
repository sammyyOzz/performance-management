import DatePicker from "react-datepicker"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"
import { BaseInput, TextArea } from "@/components/core"

export const KraOverviewPage = () => {
    return (
        <div className="flex border border-[#DFE2E7] rounded-lg px-6 pt-3 pb-12">
            <div className="grid grid-cols-2 w-full gap-8 content-start">
                <BaseInput label="Name" type="text" value="Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively" readOnly />
                <BaseInput label="Budget Allocation" type="text" value="₦0" readOnly />
                <BaseInput label="Weight" type="text" value="9" readOnly />
                <BaseInput label="Budget Released" type="text" value="₦0" readOnly />
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
                
                <BaseInput label="Donor Funding" type="text" value="₦0" readOnly />
                <div className="grid">
                    <TextArea label="Description" rows={5} />
                </div>
                <BaseInput label="Other Sources" type="text" value="₦0" readOnly />
            </div>
        </div>
    )
}