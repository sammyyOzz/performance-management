import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Link, useLocation } from "react-router"
import { Badge, BaseSearch, Table } from "@/components/core"
import { ArrowRight2, FormatCircle, More2 } from "iconsax-react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const OfficersKRAPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    
    const tabs = ["all", "active", "done"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const cards = [
        { icon: <More2 size="20" color="#003A2B" />, label: "Total Weights", value: "22.75" },
        { icon: <FormatCircle size="20" color="#003A2B" />, label: "Total KRAs", value: "6" },
        { icon: <FormatCircle size="20" color="#003A2B"/>, label: "Total KRAs Active", value: "0" },
        { icon: <FormatCircle size="20" color="#003A2B"/>, label: "Total KRAs Done", value: "6" },
    ]

    const columns = [
        {
            enableSorting: false,
            accessorKey: "kra",
            header: () => "Key Result Area",
            cell: () => {
                return (
                    <span className="line-clamp-2">Capability Building and Talent Management</span>
                )
            }
        },
        {
            accessorKey: "weights",
            header: () => "Departmental Weights",
            cell: () => {
                return (
                    <span className="line-clamp-2">8</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "status",
            header: () => "Status",
            cell: () => {
                return (
                    <Badge status="completed" label="done" />
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "action",
            header: () => "Action",
            cell: () => {
                return (
                    <Link to="/kra/officers/1" className="button button-tiny button-primary--outlined">
                        View Activities and Tasks
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
        <section className="flex flex-1 py-6 px-5 md:px-8 lg:px-10 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-9 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                        <h1 className="font-semibold text-2xl text-black">HUMAN RESOURCES MANAGEMENT - OFFICERS</h1>
                        <p className="font-normal text-sm text-[#667185]">Description of Activities and Tasks</p>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-11">
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-8">
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
                    <div className="flex flex-col gap-6">
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
                            <div className="flex items-center gap-3 w-96">
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
            </div>
        </section>
    )
}