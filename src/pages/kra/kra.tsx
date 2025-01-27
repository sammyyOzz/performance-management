import { BaseButton } from "@/components/core"
import { ArrowDown2, Moneys, More2 } from "iconsax-react"

export const KraPage = () => {
    const cards = [
        { icon: <More2 size="20" color="#003A2B" />, label: "Total Weights", value: "10" },
        { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Budget Released", value: "₦0" },
        { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Donor Funding", value: "₦0" },
        { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Other Sources", value: "₦0" },
    ]
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-hidden">
            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto">
                <div>
                    <div className="grid gap-8">
                        <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row md:items-center md:justify-between py-2 border-b border-b-[#DFE2E7]">
                            <div className="grid gap-0.5">
                                <h1 className="font-semibold text-black text-2xl">Key result area</h1>
                                <p className="font-normal text-gray-500 text-sm">See the key result area of the organisation</p>
                            </div>
                            <div className="flex items-center justify-end gap-4">
                                <BaseButton size="tiny" theme="primary" variant="outlined">
                                    2024
                                    <ArrowDown2 size="14" />
                                </BaseButton>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-10">
                            {
                                cards.map((card, index) =>
                                    <div key={index} className="flex items-center gap-3 py-3 px-4 border border-[#DFE2E7] rounded-xl">
                                        <div className="grid place-content-center size-10 bg-green-primary-10 rounded-full">
                                            {card.icon}
                                        </div>
                                        <div className="grid gap-2">
                                            <h2 className="font-semibold text-2xl text-green-primary-40">{card.value}</h2>
                                            <p className="font-normal text-sm text-grey-40">{card.label}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}