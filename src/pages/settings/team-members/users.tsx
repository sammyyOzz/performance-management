import { Eye, Trash } from "iconsax-react"
import { useLocation } from "react-router"
import { Icon } from "@iconify-icon/react"
import riMore2Fill from "@iconify-icons/ri/more-2-fill"
import { Fragment, useCallback, useState } from "react"
import { Badge, BaseSearch, Table } from "@/components/core"
import { DeleteUser, ViewUserProfile } from "@/components/page/settings"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const UsersPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )

    const [toggleModals, setToggleModals] = useState({
        openViewUserProfile: false,
        openDeleteUser: false
    })
    
    const toggleViewUserProfile = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openViewUserProfile: !toggleModals.openViewUserProfile,
        }))
    },[toggleModals.openViewUserProfile])
    
    const toggleOpenDeleteUser = useCallback(() => {
        setToggleModals((prev) => ({
        ...prev,
        openDeleteUser: !toggleModals.openDeleteUser,
        }))
    },[toggleModals.openDeleteUser])

    const columns = [
        {
            enableSorting: false,
            accessorKey: "full_name",
            header: () => "Full name",
            cell: () => {
                return (
                    <div className="flex flex-col">
                        <h3 className="text-sm text-grey-40">Aijay Solomon</h3>
                        <p className="text-xs text-[#939393]">aijaysolomon68@gmail.com</p>
                    </div>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "job_role",
            header: () => "Job Role",
            cell: () => {
                return (
                    <span className="line-clamp-2">Director</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "user_role",
            header: () => "User Role",
            cell: () => {
                return (
                    <span className="line-clamp-2">Manager</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "invited_by",
            header: () => "Invited By",
            cell: () => {
                return (
                    <div className="flex flex-col">
                        <h3 className="text-sm text-grey-40">Aijay Solomon</h3>
                        <p className="text-xs text-[#939393]">aijaysolomon68@gmail.com</p>
                    </div>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "status",
            header: () => "Status",
            cell: () => {
                return (
                    <Badge status="completed" label="active" />
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
                                <button type="button" className="group flex w-full items-center text-green-primary-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleViewUserProfile()}>
                                    <Eye size="16" color="#003A2B"/>
                                    View profile
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-red-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleOpenDeleteUser()}>
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
        <Fragment>
            <div className="flex items-center justify-between">
                <div className="grid">
                    <h4 className="text-xl font-semibold text-gray-900">Team members</h4>
                    <p className="text-xs text-[#727A86]">Here's the info on all the users in the organization.</p>
                </div>
                <div className="w-full max-w-96">
                   <BaseSearch type="text" /> 
                </div>
            </div>
            <div className="grid">
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
            <DeleteUser isOpen={toggleModals.openDeleteUser} close={() => toggleOpenDeleteUser()} />
            <ViewUserProfile isOpen={toggleModals.openViewUserProfile} close={() => toggleViewUserProfile()} />
        </Fragment>
    )
}