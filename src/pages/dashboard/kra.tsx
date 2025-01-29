import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { ArrowDown2, ArrowRight2, Moneys, More2 } from "iconsax-react"
import { BaseButton, BaseSearch, Breadcrumb, Table } from "@/components/core"
import { Link, useLocation } from "react-router"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const KraPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    const tabs = ["all", "active", "done"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const cards = [
        { icon: <More2 size="20" color="#003A2B" />, label: "Total Weights", value: "10" },
        { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Budget Released", value: "₦0" },
        { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Donor Funding", value: "₦0" },
        { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Other Sources", value: "₦0" },
    ]
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "View KRAs", href: "/dashboard/kra" },
    ]

    const columns = [
        {
            enableSorting: false,
            accessorKey: "objective",
            header: () => "Objective",
            cell: () => {
                return (
                    <span className="line-clamp-2">Optimization of Crude Oil and Gas reserves to 40 million barrels and 220tcf respectively</span>
                )
            }
        },
        {
            accessorKey: "weights",
            header: () => "Weights",
            cell: () => {
                return (
                    <span className="line-clamp-2">1</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "budget_allocation",
            header: () => "Budget Allocation",
            cell: () => {
                return (
                    <span className="line-clamp-2">₦0</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "budget_released",
            header: () => "Budget Released",
            cell: () => {
                return (
                    <span className="line-clamp-2">₦0</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "funding",
            header: () => "Donor Funding",
            cell: () => {
                return (
                    <span className="line-clamp-2">₦0</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "other_sources",
            header: () => "Other Sources",
            cell: () => {
                return (
                    <span className="line-clamp-2">₦0</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "status",
            header: () => "Status"
        },
        {
            enableSorting: false,
            accessorKey: "action",
            header: () => "Action",
            cell: () => {
                return (
                    <Link to="/dashboard/kra/1" className="button button-tiny button-primary--outlined">
                        View
                        <ArrowRight2 size="14" />
                    </Link>
                )
            }
        },
    ]

    const handlePageChange = async (page: number) => {
        // in a real page, this function would paginate the data from the backend
        setKraFilters((prev) => {
            const updatedFilters = { ...prev, page };
            updateQueryParams(updatedFilters); // Use the updated filters directly
            return updatedFilters;
        });

    };
    return (
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-hidden">
            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-5">
                    <Breadcrumb items={breadcrumbs} />
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
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 p-1 rounded-lg w-[14.5rem] bg-[#F6F8FA]">
                            {
                                tabs.map((tab) =>
                                    <motion.button key={tab} onClick={() => setActiveTab(tab)} className={cn("capitalize py-1 flex-1 font-medium text-sm rounded relative", activeTab === tab ? "text-gray-900" : "text-gray-400")}>
                                        {
                                            activeTab === tab ? <motion.div layoutId="active-background" id="active-background" className="absolute inset-0 bg-white-10 rounded" style={{ boxShadow: "0px 2px 4px 0px rgba(27, 28, 29, 0.02) 0px 6px 10px 0px rgba(27, 28, 29, 0.06)" }} /> : null
                                        }
                                        <span className="isolate">{tab}</span>
                                    </motion.button>
                                )
                            }
                        </div>
                        <div className="w-96">
                            <BaseSearch type="text" placeholder="Search..." />
                        </div>
                    </div>
                    <Table
                        columns={columns}
                        data={[""]}
                        perPage={itemsPerPage}
                        page={Number(kraFilters.page)}
                        onPageChange={handlePageChange}
                        totalCount={30}
                        emptyStateText="We couldn't find any kra on the system."
                    />
                </div>
            </div>
        </section>
    )
}