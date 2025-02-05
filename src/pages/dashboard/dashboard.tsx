import { BaseButton } from "@/components/core"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Add, ArrowDown2, ArrowRight2, Moneys, WalletMoney } from "iconsax-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Link } from "react-router"

const chartData = [
  { kra: "Enterprise Content Management", weight: 2 },
  { kra: "Optimization of Crude Oil Production to 4 million bpd", weight: 4 },
  { kra: "Domestic Refining Capacity", weight: 6 },
  { kra: "Real-time Surveillance in Oil and Gas infrastructures", weight: 8 },
  { kra: "Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively", weight: 3 },
  { kra: "Service Innovation and Improvement", weight: 10 },
  { kra: "Performance Management System", weight: 1 },
  { kra: "Stakeholders Engagement (MDA)", weight: 5 },
  { kra: "Enterprise Content Management", weight: 2 },
  { kra: "Optimization of Crude Oil Production to 4 million bpd", weight: 4 },
  { kra: "Domestic Refining Capacity", weight: 6 },
  { kra: "Real-time Surveillance in Oil and Gas infrastructures", weight: 8 },
  { kra: "Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively", weight: 3 },
  { kra: "Service Innovation and Improvement", weight: 10 },
  { kra: "Performance Management System", weight: 1 },
  { kra: "Stakeholders Engagement (MDA)", weight: 5 },
]
const chartConfig = {
  weight: {
    label: "Weight",
    color: "#0F973D",
  },
  kra: {
    color: "red"
  }
} satisfies ChartConfig

export const DashboardPage = () => {
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
                    <div className="grid gap-0.5">
                        <h1 className="font-semibold text-black text-2xl">Summary</h1>
                        <p className="font-normal text-gray-500 text-sm">Review the progress of our mission, vision, and budget.</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <BaseButton size="tiny" theme="primary" variant="outlined">
                            2024
                            <ArrowDown2 size="14" />
                        </BaseButton>
                        <Link to="/dashboard/kra" className="button button-tiny button-primary--filled-focus">
                            <span className="flex items-center gap-2.5">
                                View breakdown of KRAs
                                <ArrowRight2 size="20" />
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7">
                    <div className="flex items-center gap-5 py-3 px-4 border border-[#DFE2E7] rounded-xl">
                        <div className="grid place-content-center size-[3.75rem] bg-[#AF52DE]/[0.13] rounded-full">
                            <WalletMoney size="30" color="#AF52DE"/>
                        </div>
                        <div className="grid gap-1">
                            <h2 className="font-semibold text-xl text-green-primary-40">₦ 2,450,300,000</h2>
                            <p className="font-normal text-sm text-grey-40">Budget Allocation</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 py-3 px-4 border border-[#DFE2E7] rounded-xl">
                        <div className="grid place-content-center size-[3.75rem] bg-[#007AFF]/[0.13] rounded-full">
                            <Moneys size="30" color="#007AFF"/>
                        </div>
                        <div className="grid gap-1">
                            <h2 className="font-semibold text-xl text-green-primary-40">₦ 1,890,504,000</h2>
                            <p className="font-normal text-sm text-grey-40">Budget Released</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col border border-[#DFE2E7] rounded-xl h-full overflow-hidden">
                    <div className="flex gap-4 md:gap-0 items-center justify-between p-4 border-b border-b-[#DFE2E7]">
                        <div className="flex items-center gap-2">
                            <span className="text-base font-medium text-gray-600">Key Result Area</span>
                            <span className="size-[1.875rem] grid place-content-center rounded-full bg-gray-50 text-xs font-medium text-gray-600">12</span>
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
                                barSize={26}
                                barGap={8}
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
        </section>
    )
}