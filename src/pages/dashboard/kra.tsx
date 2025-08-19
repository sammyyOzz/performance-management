import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Link, useLocation } from "react-router"
import { useGetKRAs } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { ArrowDown2, ArrowRight2, Moneys, More2 } from "iconsax-react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"
import { Badge, BaseButton, BaseSearch, Breadcrumb, RenderIf, Table } from "@/components/core"
import { SingleKraType } from "@/types/kra"
import { formattedNumber } from "@/utils/textFormatter"
import { useDebounce } from "@/hooks/useDebounce"
import DatePicker from "react-datepicker"
import { format } from "date-fns"

export const KraPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(10)
    const searchParams = new URLSearchParams(location.search)
    const initialFilter = searchParams.get("title") || "";
    const { value, onChangeHandler } = useDebounce(500, initialFilter, (debouncedValue) => {
        setKraFilters((prev) => {
            const updatedFilters = { ...prev, title: debouncedValue };
            updateQueryParams(updatedFilters); // Update the URL search params
            return updatedFilters;
        });
    })
    const defaultFilters = getPaginationParams(searchParams, { page: 1, title: "", year: new Date().getFullYear()?.toString() });
    const [kraFilters, setKraFilters] = useState(defaultFilters)
    const { data, isLoading } = useGetKRAs({ ...kraFilters, page_size: "10" })
    const tabs = ["all", "active", "done"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const cards = useMemo(() => {
        return [
            { icon: <More2 size="20" color="#003A2B" />, label: "Total Weights", value: data?.total_weight || 0 },
            { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Budget Released", value: formattedNumber(data?.total_budget_released || 0, { maximumFractionDigits: 0 }) },
            { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Donor Funding", value: formattedNumber(data?.total_donor_funding || 0, { maximumFractionDigits: 0 }) },
            { icon: <Moneys size="20" color="#003A2B"/>, label: "Total Other Sources", value: formattedNumber(data?.total_other_sources || 0, { maximumFractionDigits: 0 }) },
        ]
    },[data?.total_budget_released, data?.total_donor_funding, data?.total_other_sources, data?.total_weight])
    const breadcrumbs = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "View KRAs", href: "/dashboard/kra" },
    ]

    const columns = [
        {
            enableSorting: false,
            accessorKey: "objective",
            header: () => "Objective",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <span className="line-clamp-2">{item?.name}</span>
                )
            }
        },
        {
            accessorKey: "weights",
            header: () => "Weights",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <span className="line-clamp-2">{item?.weight}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "budget_allocation",
            header: () => "Budget Allocation",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <span className="line-clamp-2">{formattedNumber(item?.budget_allocation)}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "budget_released",
            header: () => "Budget Released",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <span className="line-clamp-2">{formattedNumber(item?.budget_released)}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "funding",
            header: () => "Donor Funding",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <span className="line-clamp-2">{formattedNumber(item?.donor_funding)}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "other_sources",
            header: () => "Other Sources",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <span className="line-clamp-2">{formattedNumber(item?.other_sources)}</span>
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
            cell: ({ row }: { row: any }) => {
                const item = row?.original as SingleKraType
                return (
                    <Link to={`/dashboard/kra/${item?.id}`} className="button button-tiny button-primary--outlined">
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
        <section className="flex py-9 px-5 md:px-8 lg:px-10 xl:px-12 page-height overflow-y-scroll bg-[#FFFFFF]">
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
                                <DatePicker
                                    selected={kraFilters?.year as any}
                                    onChange={(v) => setKraFilters((prev) => ({ ...prev, year: format(v as Date, "yyyy") }))}
                                    showYearPicker
                                    dateFormat="yyyy"
                                    className="button button-tiny button-primary--outlined"
                                    popperClassName="origin-top-right"
                                    customInput={
                                        <BaseButton size="tiny" theme="primary" variant="outlined">
                                            {kraFilters?.year}
                                            <ArrowDown2 size="14" />
                                        </BaseButton>
                                    }
                                />
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
                            <BaseSearch type="text" placeholder="Search..." defaultValue={value} onChange={onChangeHandler} />
                        </div>
                    </div>
                    <RenderIf condition={!isLoading}>
                        <Table
                            columns={columns}
                            data={data?.data ?? []}
                            perPage={itemsPerPage}
                            page={Number(kraFilters.page)}
                            onPageChange={handlePageChange}
                            totalCount={data?.total_items}
                            emptyStateTitle="No Key Result Area"
                            emptyStateImage="/empty-clipboard.svg"
                            emptyStateAction={<Link to="/dashboard/kra/create" className="button button-tiny button-primary--filled-focus">Create a key result area</Link>}
                            emptyStateText="Click “create a key result area” button to get started in adding your first KRA"
                        />
                    </RenderIf>
                    <RenderIf condition={isLoading}>
                        <div className="flex flex-col h-96 items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
                    </RenderIf>
                </div>
            </div>
        </section>
    )
}