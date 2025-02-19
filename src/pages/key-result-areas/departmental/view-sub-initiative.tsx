import { useCallback, useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { useLocation } from "react-router"
import { Icon } from "@iconify-icon/react"
import riMore2Fill from "@iconify-icons/ri/more-2-fill"
import { Add, Edit2, Eye, InfoCircle, More2, Trash } from "iconsax-react"
import { Badge, BaseSearch, Breadcrumb, Table } from "@/components/core"
import { Button, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"
import { CreateSubInitiative, DeleteSubInitiative, EditSubInitiative, ViewSubInitiative } from "@/components/page/key-result-areas"

export const ViewDepartmentSubInitiativePage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    
    const [toggleModals, setToggleModals] = useState({
        openCreateSubInitiative: false,
        openDeleteSubInitiative: false,
        openEditSubInitiative: false,
        openViewSubInitiative: false,
    })
    
    const toggleCreateSubInitiative = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openCreateSubInitiative: !toggleModals.openCreateSubInitiative,
        }))
    }, [toggleModals.openCreateSubInitiative])
    
    const toggleDeleteSubInitiative = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openDeleteSubInitiative: !toggleModals.openDeleteSubInitiative,
        }))
    }, [toggleModals.openDeleteSubInitiative])
    
    const toggleEditSubInitiative = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openEditSubInitiative: !toggleModals.openEditSubInitiative,
        }))
    }, [toggleModals.openEditSubInitiative])
    
    const toggleViewSubInitiative = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openViewSubInitiative: !toggleModals.openViewSubInitiative,
        }))
    }, [toggleModals.openViewSubInitiative])
    
    const tabs = ["all", "active", "done"]
    const [activeTab, setActiveTab] = useState(tabs[0])
    const cards = [
        { icon: <More2 size="20" color="#003A2B" />, label: "Departmental  KRA Weight", value: "6.5" },
        { icon: <More2 size="20" color="#003A2B"/>, label: "Total Graded Weight", value: "6" },
        { icon: <More2 size="20" color="#003A2B"/>, label: "Total Assigned Weight", value: "6" },
    ]
    const breadcrumbs = [
        { label: "Dept. KRAs", href: "/kra/departments/sub-initiative" },
        { label: "Sub-Initiative", href: "/kra/departments/sub-initiative/1" },
    ]

    const columns = [
        {
            enableSorting: false,
            accessorKey: "sub_initiative",
            header: () => "Sub-Initiatives",
            cell: () => {
                return (
                    <span className="line-clamp-2">Staff Pension and Retirement</span>
                )
            }
        },
        {
            accessorKey: "graded_weights",
            header: () => "Graded Weight",
            cell: () => {
                return (
                    <span className="line-clamp-2">8.79</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "kpi",
            header: () => "KPIs",
            cell: () => {
                return (
                    <span className="line-clamp-2">56% of pensioners and retirees benfits paid</span>
                )
            }
        },
        {
            accessorKey: "assigned_weights",
            header: () => "Assigned Weight",
            cell: () => {
                return (
                    <span className="line-clamp-2">2</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "target",
            header: () => "Target",
            cell: () => {
                return (
                    <span className="line-clamp-2">A work plan</span>
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
                                <button type="button" className="group flex w-full items-center text-green-primary-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleViewSubInitiative()}>
                                    <Eye size="16" color="#003A2B"/>
                                    View
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-green-primary-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleEditSubInitiative()}>
                                    <Edit2 size="16" color="#003A2B"/>
                                    Edit
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-red-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleDeleteSubInitiative()}>
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
        <section className="flex py-3.5 px-5 md:px-8 lg:px-10 xl:px-12 2xl:px-0 page-height overflow-y-scroll">
            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto">
                <div className="flex flex-col gap-3.5">
                    <Breadcrumb items={breadcrumbs} />
                    <div className="grid gap-5">
                        <div className="flex flex-col items-start gap-4 md:gap-0 md:flex-row md:items-center md:justify-between py-2 border-b border-b-[#DFE2E7]">
                            <div className="grid gap-0.5">
                                <h1 className="font-semibold text-black text-2xl">Staff Welfare</h1>
                                <p className="font-normal text-gray-500 text-sm">See the sub-initiative of a key result area</p>
                            </div>
                            <div className="flex items-center justify-end gap-3 p-3 rounded bg-green-secondary-10">
                                <InfoCircle size="14" color="#0F973D" />
                                <span className="text-xs font-medium text-green-secondary-40">
                                    Note: For this key result area to be considered done, all sub-intitative status must be done
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            Status: <Badge status="pending" label="Active" size="medium" />
                        </div>
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
                        <div className="flex items-center gap-3 max-w-md w-full">
                            <BaseSearch type="text" placeholder="Search..." />
                            <Button className="button button-tiny button-primary--filled-focus" onClick={() => toggleCreateSubInitiative()}>
                                <div className="flex items-center gap-2.5">
                                    <span className="whitespace-nowrap">Add sub-initiative</span>
                                    <Add size="20" />
                                </div>
                            </Button>
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
            <CreateSubInitiative isOpen={toggleModals.openCreateSubInitiative} close={() => toggleCreateSubInitiative()} />
            <DeleteSubInitiative isOpen={toggleModals.openDeleteSubInitiative} close={() => toggleDeleteSubInitiative()} />
            <EditSubInitiative isOpen={toggleModals.openEditSubInitiative} close={() => toggleEditSubInitiative()} />
            <ViewSubInitiative isOpen={toggleModals.openViewSubInitiative} close={() => toggleViewSubInitiative()} />
        </section>
    )
}