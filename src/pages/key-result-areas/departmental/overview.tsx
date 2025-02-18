import DatePicker from "react-datepicker"
import { BaseInput } from "@/components/core"
import riCalendar2Line from "@iconify-icons/ri/calendar-2-line"

export const DepartmentalOverviewPage = () => {
    return (
        <div className="flex max-w-[39.0625rem] w-full">
            <div className="grid w-full gap-8 content-start">
                <BaseInput label="Department Name" type="text" value="Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively" readOnly />
                <BaseInput label="Number of Divisions" type="text" value="₦0" readOnly />
                <BaseInput label="Number of Branches" type="text" value="9" readOnly />
                <BaseInput label="Number of Sections" type="text" value="₦0" readOnly />
                <BaseInput label="Total KRA Weight" type="text" value="₦0" readOnly />
                <div className="grid grid-cols-2 content-start gap-4">
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="KRA Start Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                    <div className="grid">
                        <DatePicker
                            // selected={values?.date as any}
                            onChange={() => {}}
                            // minDate={add(new Date(), { days: 1 })}
                            dateFormat="yyyy-MM-dd"
                            customInput={<BaseInput label="KRA End Date" type="text" iconRight={riCalendar2Line} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}