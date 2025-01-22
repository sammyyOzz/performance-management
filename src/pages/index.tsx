import { BaseButton } from "@/components/core"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Add, ArrowDown2, ArrowRight2, Moneys, WalletMoney } from "iconsax-react"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"

const chartData = [
  { month: "Enterprise Content Management", desktop: 2 },
  { month: "Optimization of Crude Oil Production to 4 million bpd", desktop: 4 },
  { month: "Domestic Refining Capacity", desktop: 6 },
  { month: "Real-time Surveillance in Oil and Gas infrastructures", desktop: 8 },
  { month: "Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively", desktop: 3 },
  { month: "Service Innovation and Improvement", desktop: 10 },
  { month: "Performance Management System", desktop: 1 },
  { month: "Stakeholders Engagement (MDA)", desktop: 5 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0F973D",
  },
} satisfies ChartConfig

export const DashboardPage = () => {
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-hidden">
            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="grid gap-0.5">
                        <h1 className="font-semibold text-black text-2xl">Summary</h1>
                        <p className="font-normal text-gray-500 text-sm">Review the progress of our mission, vision, and budget.</p>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                        <BaseButton size="tiny" theme="primary" variant="outlined">
                            2024
                            <ArrowDown2 size="14" />
                        </BaseButton>
                        <BaseButton size="tiny" theme="primary" variant="filled">
                            View breakdown of KRAs
                            <ArrowRight2 size="20" />
                        </BaseButton>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-7">
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
                    <div className="flex items-center justify-between p-4 border-b border-b-[#DFE2E7]">
                        <div className="flex items-center gap-2">
                            <span className="text-base font-medium text-gray-600">Key Result Area</span>
                            <span className="size-[1.875rem] grid place-content-center rounded-full bg-gray-50 text-xs font-medium text-gray-600">12</span>
                        </div>
                        <BaseButton size="tiny" theme="primary" variant="filled">
                            Create a key result area
                            <Add size="20" />
                        </BaseButton>
                    </div>
                    <div className="flex items-center justify-center flex-1 px-6 py-16 overflow-scroll">
                        <ChartContainer className="w-full min-h-auto max-h-96" config={chartConfig}>
                            <BarChart
                                accessibilityLayer
                                data={chartData}
                                layout="vertical"
                                barSize={26}
                                barGap={8}
                                margin={{
                                    left: -20,
                                }}
                            >
                                <XAxis type="number" dataKey="desktop" scale="linear" domain={[0, 10]} ticks={[1,2,3,4,5,6,7,8,9,10]} tickLine={false} axisLine={false} />
                                <YAxis
                                    dataKey="month"
                                    type="category"
                                    width={300}
                                    tick={{ fill: "#475367", fontSize: 12, width: 300 }}
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
                                    content={<ChartTooltipContent className="bg-white-10" hideLabel />}
                                />
                                <Bar dataKey="desktop" className="flex-1" fill="var(--color-desktop)"  radius={[0,4,4,0]} />
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>
            </div>
        </section>
    )
}