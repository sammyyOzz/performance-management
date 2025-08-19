import { Eye, Trash } from "iconsax-react"
import { useLocation } from "react-router"
import { Icon } from "@iconify-icon/react"
import riMore2Fill from "@iconify-icons/ri/more-2-fill"
import { Fragment, useCallback, useState } from "react"
import { Badge, BaseSearch, RenderIf, Table } from "@/components/core"
import { DeleteUser, ViewUserProfile } from "@/components/page/settings"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"
import { useGetUsers } from "@/services/hooks/queries"
import { FetchedUserType } from "@/types/user"
import { useDebounce } from "@/hooks/useDebounce"
import { Loader } from "@/components/core/Button/Loader"

export const UsersPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(10);

    const { value: searchValue, onChangeHandler: onSearchChange } = useDebounce(500);

    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    const { data: users, isLoading: loadingUsers } = useGetUsers({ 
        page_size: itemsPerPage.toString(), 
        search: searchValue,
        page: kraFilters.page.toString() 
    })

    const [toggleModals, setToggleModals] = useState({
        openViewUserProfile: false,
        openDeleteUser: false,
        activeUser: null as FetchedUserType | null,
    })
    
    const toggleViewUserProfile = useCallback((user: FetchedUserType | null) => {
        setToggleModals((prev) => ({
            ...prev,
            openViewUserProfile: !toggleModals.openViewUserProfile,
            activeUser: user
        }))
    },[toggleModals.openViewUserProfile])
    
    const toggleOpenDeleteUser = useCallback((user: FetchedUserType | null) => {
        setToggleModals((prev) => ({
            ...prev,
            openDeleteUser: !toggleModals.openDeleteUser,
            activeUser: user
        }))
    },[toggleModals.openDeleteUser])

    const columns = [
        {
            enableSorting: false,
            accessorKey: "full_name",
            header: () => "Full name",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedUserType
                return (
                    <div className="flex flex-col">
                        <h3 className="text-sm text-grey-40 capitalize">{item?.first_name} {item?.last_name}</h3>
                        <p className="text-xs text-[#939393]">{item?.email}</p>
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
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedUserType
                return (
                    <Badge status={item?.status === "pending" ? "pending" : "completed"} label={item?.status} />
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "action",
            header: () => "",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedUserType
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
                                <button type="button" className="group flex w-full items-center text-green-primary-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleViewUserProfile(item)}>
                                    <Eye size="16" color="#003A2B"/>
                                    View profile
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" className="group flex w-full items-center text-red-40 gap-2 rounded-lg py-1.5 px-3" onClick={() => toggleOpenDeleteUser(item)}>
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
                    <p className="text-xs text-[#727A86]">Here's the info on all the staffs in the organization.</p>
                </div>
                <div className="w-full max-w-96">
                   <BaseSearch type="text" defaultValue={searchValue} onChange={onSearchChange} /> 
                </div>
            </div>
            <RenderIf condition={!loadingUsers}>
                <Table
                    columns={columns}
                    data={users?.data || []}
                    perPage={itemsPerPage}
                    page={Number(kraFilters.page)}
                    onPageChange={handlePageChange}
                    totalCount={users?.total}
                    emptyStateText="We couldn't find any user on the system."
                />
            </RenderIf>

            <RenderIf condition={loadingUsers}>
                <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
            <DeleteUser isOpen={toggleModals.openDeleteUser} close={() => toggleOpenDeleteUser(null)} />
            <ViewUserProfile user={toggleModals.activeUser as FetchedUserType} isOpen={toggleModals.openViewUserProfile} close={() => toggleViewUserProfile(null)} />
        </Fragment>
    )
}