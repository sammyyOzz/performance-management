import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { Icon } from "@iconify-icon/react"
import { useLocation } from "react-router"
import riMore2Fill from "@iconify-icons/ri/more-2-fill"
import { Edit2, FormatCircle, Trash } from "iconsax-react"
import { Badge, BaseSearch, Table } from "@/components/core"
import { EditSectionsKra } from "@/components/page/key-result-areas"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const SectionsKRAPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    
    const [toggleModals, setToggleModals] = useState({
        openDeleteKra: false,
        openEditKra: false,
    })
        
    const toggleDeleteKra = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openDeleteKra: !toggleModals.openDeleteKra,
        }))
    }, [toggleModals.openDeleteKra])
    
    const toggleEditKra = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openEditKra: !toggleModals.openEditKra,
        }))
    }, [toggleModals.openEditKra])
    
    const tabs = ["all", "active", "done"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const cards = [
        { icon: <FormatCircle size="20" color="#003A2B" />, label: "Total KRAs", value: "1.75" },
        { icon: <FormatCircle size="20" color="#003A2B"/>, label: "Total KRAs Done", value: "1" },
        { icon: <FormatCircle size="20" color="#003A2B"/>, label: "Total KRAs Active", value: "1" },
    ]

    const columns = [
        {
            enableSorting: false,
            accessorKey: "kra",
            header: () => "Key Result Area",
            cell: () => {
                return (
                    <span className="line-clamp-2">Compendium of Innovation Champions</span>
                )
            }
        },
        {
            accessorKey: "weights",
            header: () => "Departmental Weights",
            cell: () => {
                return (
                    <span className="line-clamp-2">0.25</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "responsibility",
            header: () => "Responsibility",
            cell: () => {
                return (
                    <span className="line-clamp-2">Records</span>
                )
            }
        },
        {
            accessorKey: "assigned_weight",
            header: () => "Assigned Weight",
            cell: () => {
                return (
                    <span className="line-clamp-2">0.25</span>
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
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-lg bg-white-10 border border-[#E4E7EC] p-2 text-sm/6 font-semibold focus:outline-none">
                            <Icon icon={riMore2Fill} width={16} height={16} />
                        </MenuButton>
                        <MenuItems
                            transition
                            anchor="bottom end"
                            className="w-28 origin-top-right rounded-lg shadow-lg bg-white-10 p-2 space-y-2 text-xs transition duration-100 ease-out [--anchor-gap:var(--spacing-2)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-green-primary-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleEditKra()}>
                                    <Edit2 size="16" color="#003A2B"/>
                                    Edit
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-red-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleDeleteKra()}>
                                    <Trash size="16" color="#D42620"/>
                                    Delete
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
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
            <div className="flex flex-col flex-1 gap-6 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-3">
                    <div className="grid gap-1 py-2 border-b border-b-[#DFE2E7]">
                        <h1 className="font-semibold text-2xl text-black">HUMAN RESOURCES MANAGEMENT - SECTIONS</h1>
                        <p className="font-normal text-sm text-[#667185]">See the key result area of your sections.</p>
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <span className="font-medium text-sm text-grey-40">Branch names</span>
                        <div className="flex items-center gap-8 p-4 rounded-md border border-[#DFE2E7]">
                            <span className="text-sm text-grey-40">APPOINTMENT</span>
                            <span className="text-sm text-grey-40">PROMOTION</span>
                            <span className="text-sm text-grey-40">DISCIPLINE</span>
                            <span className="text-sm text-grey-40">IPPIS</span>
                            <span className="text-sm text-grey-40">TRAINING</span>
                            <span className="text-sm text-grey-40">STAFF WELFARE</span>
                            <span className="text-sm text-grey-40">LABOUR</span>
                            <span className="text-sm text-grey-40">Front End</span>
                            <span className="text-sm text-grey-40">Back End</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-12">
                    <div className="flex flex-col gap-5">
                        <div className="grid gap-8">
                            <div className="grid grid-cols-3 gap-10">
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
            <EditSectionsKra isOpen={toggleModals.openEditKra} close={() => toggleEditKra()} />
        </section>
    )
}