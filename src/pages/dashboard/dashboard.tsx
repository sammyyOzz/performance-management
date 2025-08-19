import { BaseButton, RenderIf } from "@/components/core"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Add, ArrowDown2, ArrowRight2, MagicStar, Moneys, TaskSquare, Timer, Timer1, WalletMoney } from "iconsax-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Link } from "react-router"
import { useGetAssignments, useGetCurrentUser, useGetKRAs } from "@/services/hooks/queries"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { formattedNumber } from "@/utils/textFormatter"
import { Loader } from "@/components/core/Button/Loader"
import DatePicker from "react-datepicker"
import { format } from "date-fns"

const chartConfig = {
  weight: {
    label: "Weight",
    color: "#2E8B57",
  },
  kra: {
    color: "red"
  }
} satisfies ChartConfig

export const DashboardPage = () => {
    const { data: currentUser, isLoading: isLoadingUser } = useGetCurrentUser();
    const { data: assignments, isLoading: isLoadingAssignment } = useGetAssignments({ user_id: currentUser?.id, page_size: Number.MAX_SAFE_INTEGER }, { enabled: !!currentUser?.id});
    const [filters, setFilters] = useState({
        year: new Date().getFullYear()?.toString()
    })
    const { data, isLoading } = useGetKRAs({ page_size: "10", ...filters })
    const summaryCards = useMemo(() => {
        return [
            { icon: <WalletMoney size="30" color="#B67A12"/>, iconColor: "bg-[#FBE2B7]", bgColor: "bg-[#FEF6E8]", label: "Budget Allocation", value: formattedNumber(data?.total_budget_allocation || 0, { maximumFractionDigits: 0 }) },
            { icon: <Moneys size="30" color="#9F1D18"/>, iconColor: "bg-[#F9DEDE]", bgColor: "bg-[#FBE9E9]", label: "Budget Released", value: formattedNumber(data?.total_budget_released || 0, { maximumFractionDigits: 0 }) },
        ]
    }, [data?.total_budget_allocation, data?.total_budget_released])
    
    const cards = useMemo(() => {
        return [
            { icon: <TaskSquare size="30" color="#AF52DE"/>, iconColor: "bg-[#AF52DE]/[0.13]", bgColor: "bg-[#AF52DE]/[0.14]", label: "Active Tasks", value: assignments?.filter((item) => item?.status === "active").length },
            { icon: <Timer size="30" color="#90C644"/>, iconColor: "bg-[#E4F8C8]", bgColor: "bg-[#A4DE52]/[0.1]", label: "Progress of Task Done", value: "20%" },
            { icon: <MagicStar size="30" color="#62B1C6"/>, iconColor: "bg-[#B9EBF8]", bgColor: "bg-[#EBF6F9]", label: "Task Done", value: assignments?.filter((item) => item?.status === "done").length },
            { icon: <Timer1 size="30" color="#C77946"/>, iconColor: "bg-[#FFE6D5]", bgColor: "bg-[#FFF2EA]", label: "Due in 30 days", value: assignments?.filter((item) => item?.status === "active").length },
        ]
    },[assignments])

    const chartData = useMemo(() => {
        return data?.data?.map((item) => ({ kra: item?.name, weight: item?.weight })) || []
    }, [data?.data])
    
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 page-height overflow-y-scroll bg-[#FFFFFF]">
            <RenderIf condition={!isLoading && !isLoadingUser && !isLoadingAssignment}>
                <div className="grid flex-1 gap-10 max-w-screen-2xl mx-auto">
                    <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
                        <div className="grid gap-0.5">
                            <h1 className="font-semibold text-black text-2xl">Welcome, {currentUser?.first_name}</h1>
                            <p className="font-normal text-gray-500 text-sm">Keep a track of your tasks within 30 days</p>
                        </div>
                        <div className="flex items-center relative justify-end gap-4">
                            <Link to="/tasks/own" className="button button-tiny button-primary--filled-focus">
                                <span className="flex items-center gap-2.5">
                                    View tasks
                                    <ArrowRight2 size="20" />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-7">
                        {
                            cards.map((card, index) =>
                                <div key={index.toString()} className={cn("flex items-center gap-5 py-3 px-4 border border-[#DFE2E7] rounded-xl", card.bgColor)}>
                                    <div className={cn("grid place-content-center size-[3.75rem] rounded-full", card?.iconColor)}>
                                        {card.icon}
                                    </div>
                                    <div className="grid gap-1">
                                        <h2 className="font-semibold text-xl text-green-primary-40">{card?.value}</h2>
                                        <p className="font-normal text-sm text-grey-40">{card?.label}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
                        <div className="grid gap-0.5">
                            <h1 className="font-semibold text-black text-2xl">Summary</h1>
                            <p className="font-normal text-gray-500 text-sm">Review the progress of our mission, vision, and budget.</p>
                        </div>
                        <div className="flex items-center relative justify-end gap-4">
                            <DatePicker
                                selected={filters?.year as any}
                                onChange={(v) => setFilters((prev) => ({ ...prev, year: format(v as Date, "yyyy") }))}
                                showYearPicker
                                dateFormat="yyyy"
                                className="button button-tiny button-primary--outlined"
                                customInput={
                                    <BaseButton size="tiny" theme="primary" variant="outlined">
                                        {filters?.year}
                                        <ArrowDown2 size="14" />
                                    </BaseButton>
                                }
                            />
                            <Link to="/dashboard/kra" className="button button-tiny button-primary--filled-focus">
                                <span className="flex items-center gap-2.5">
                                    View breakdown of KRAs
                                    <ArrowRight2 size="20" />
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7">
                        {
                            summaryCards.map((card, index) =>
                                <div key={index.toString()} className={cn("flex items-center gap-5 py-3 px-4 border border-[#DFE2E7] rounded-xl", card.bgColor)}>
                                    <div className={cn("grid place-content-center size-[3.75rem] rounded-full", card?.iconColor)}>
                                        {card.icon}
                                    </div>
                                    <div className="grid gap-1">
                                        <h2 className="font-semibold text-xl text-green-primary-40">{card?.value}</h2>
                                        <p className="font-normal text-sm text-grey-40">{card?.label}</p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col border border-[#DFE2E7] rounded-xl h-[calc(100dvh-252px)] overflow-hidden">
                        <div className="flex gap-4 md:gap-0 items-center justify-between p-4 border-b border-b-[#DFE2E7]">
                            <div className="flex items-center gap-2">
                                <span className="text-base font-medium text-gray-600">Key Result Area</span>
                                <span className="size-[1.875rem] grid place-content-center rounded-full bg-gray-50 text-xs font-medium text-gray-600">{chartData?.length}</span>
                            </div>
                            <Link to="/dashboard/kra/create" className="button button-tiny button-primary--filled-focus">
                                <span className="flex items-center gap-2.5">
                                    Create a key result area
                                    <Add size="20" />
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center flex-1 px-0 md:px-6 py-0 md:py-6 overflow-hidden">
                            <ChartContainer className="flex w-full min-h-auto max-h-full" config={chartConfig}>
                                <BarChart
                                    accessibilityLayer
                                    data={chartData}
                                    layout="vertical"
                                    // barSize={26}
                                    // barCategoryGap={80}
                                    margin={{
                                        left: -20
                                    }}
                                    
                                >
                                    <XAxis type="number" dataKey="weight" scale="linear" domain={[0, 10]} ticks={[1,2,3,4,5,6,7,8,9,10]} tickLine={false} axisLine={false} />
                                    <YAxis
                                        dataKey="kra"
                                        type="category"
                                        width={250}
                                        tick={{ fill: "#475367", fontSize: 12, width: 250 }}
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                    />
                                    <CartesianGrid 
                                        horizontal={false} 
                                        vertical={true}
                                        stroke="#0F973D"
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        key="kra"
                                        content={<ChartTooltipContent className="bg-white-10 max-w-96" indicator="line" hidden />}
                                    />
                                    <Bar dataKey="weight" values="kra" className="flex-1" fill="var(--color-weight)" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </div>
                </div>
            </RenderIf>
            <RenderIf condition={isLoading || isLoadingUser || isLoadingAssignment}>
                <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
        </section>
    )
}
