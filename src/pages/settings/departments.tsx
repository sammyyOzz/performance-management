import { useState } from "react"
import { Icon } from "@iconify-icon/react"
import { useLocation } from "react-router"
import riMore2Fill from "@iconify-icons/ri/more-2-fill"
import { BaseButton, Table } from "@/components/core"
import { Add, Eye, Trash } from "iconsax-react"
import { AddUser } from "@/components/page/settings"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const DepartmentsPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    const [openAddUser, setOpenAddUser] = useState(false)

    const columns = [
        {
            enableSorting: false,
            accessorKey: "department_name",
            header: () => "Department Name",
            cell: () => {
                return (
                    <span className="line-clamp-2 text-sm text-grey-40">Upstream</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "hod",
            header: () => "Head of Department",
            cell: () => {
                return (
                    <span className="line-clamp-2">Ajayi Seyi</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "no_of_division",
            header: () => "No. of Division",
            cell: () => {
                return (
                    <span className="line-clamp-2">3</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "no_of_branches",
            header: () => "No. of Branches",
            cell: () => {
                return (
                    <span className="line-clamp-2">3</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "no_of_sections",
            header: () => "No. of Sections",
            cell: () => {
                return (
                    <span className="line-clamp-2">3</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "action",
            header: () => "",
            cell: () => {
                return (
                    <Menu>
                        <MenuButton className="inline-flex items-center gap-2 rounded-lg bg-white-10 border border-[#E4E7EC] p-2 text-sm/6 font-semibold focus:outline-none">
                            <Icon icon={riMore2Fill} width={16} height={16} />
                        </MenuButton>
                        <MenuItems
                            transition
                            anchor="bottom end"
                            className="w-36 origin-top-right rounded-lg shadow-lg bg-white-10 p-2 space-y-2 text-xs transition duration-100 ease-out [--anchor-gap:var(--spacing-2)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-green-primary-40 gap-2 rounded-lg py-1.5 px-3">
                                    <Eye size="16" color="#003A2B"/>
                                    View profile
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-red-40 gap-2 rounded-lg py-1.5 px-3">
                                    <Trash size="16" color="#D42620"/>
                                    Remove User
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
        <section className="flex-1 bg-[#FDFDFD] p-10 overflow-y-scroll">
            <div className="flex flex-col gap-10 max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between p-4 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <div className="grid gap-1">
                        <h1 className="font-semibold text-xl text-black">Departments</h1>
                        <p className="font-normal text-xs text-[#727A86]">Invite and manage team members in your organization</p>
                    </div>
                    <BaseButton type="button" size="small" theme="primary" variant="filled" onClick={() => setOpenAddUser(true)}>
                        Add Department
                        <Add size="20" />
                    </BaseButton>
                </div>
                <div className="grid gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <Table
                        columns={columns}
                        data={[""]}
                        perPage={itemsPerPage}
                        page={Number(kraFilters.page)}
                        onPageChange={handlePageChange}
                        totalCount={1}
                        emptyStateText="We couldn't find any user on the system."
                    />
                </div>
            </div>
            <AddUser isOpen={openAddUser} close={() => setOpenAddUser(false)} />
        </section>
    )
}