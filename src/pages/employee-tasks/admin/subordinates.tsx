import { useCallback, useState } from "react"
import { Button } from "@headlessui/react"
import { Add, Task, User } from "iconsax-react"
import { useDebounce } from "@/hooks/useDebounce"
import { BaseSearch, RenderIf, Table } from "@/components/core"
import { CreateEmployeeTask, ViewMemberProfile } from "@/components/page/employee-tasks"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"
import { Link } from "react-router"
import { useGetCurrentUser, useGetUsers } from "@/services/hooks/queries"
import { Loader } from "@/components/core/Button/Loader"
import { FetchedUserType } from "@/types/user"

export const SubordinatesTaskPage = () => {
    const [itemsPerPage] = useState(10);
    const { value, onChangeHandler } = useDebounce(500);

    const searchParams = new URLSearchParams(location.search)
    const defaultFilters = getPaginationParams(searchParams, { page: 1, title: "" });
    const [kraFilters, setKraFilters] = useState(defaultFilters)

    const { data: user, isLoading } = useGetCurrentUser()
    const { data: subordinates, isLoading: loadingSubordinates } = useGetUsers({ 
        supervisor_id: user?.id?.toString(), 
        page_size: itemsPerPage.toString(),
        search: value,
        page: kraFilters.page.toString()
    }, { 
        enabled: !!user?.id 
    })
    
    const [toggleModals, setToggleModals] = useState({
        openCreateEmployeeTask: false,
        openViewProfile: false,
        activeEmployee: null as null | FetchedUserType
    })
        
    const toggleCreateTask = useCallback((item: null | FetchedUserType) => {
        setToggleModals((prev) => ({
            ...prev,
            activeEmployee: item,
            openCreateEmployeeTask: !toggleModals.openCreateEmployeeTask,
        }))
    }, [toggleModals.openCreateEmployeeTask])
        
    const toggleViewProfile = useCallback((item: null | FetchedUserType) => {
        setToggleModals((prev) => ({
            ...prev,
            activeEmployee: item,
            openViewProfile: !toggleModals.openViewProfile,
        }))
    }, [toggleModals.openViewProfile])

    const columns = [
        {
            enableSorting: false,
            accessorKey: "name",
            header: () => "Subordinate Name",
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
            accessorKey: "role",
            header: () => "Job role",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedUserType
                return (
                    <span className="line-clamp-2">{item?.position}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "action",
            header: () => "Action",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedUserType
                return (
                    <div className="flex items-center justify-end gap-4 w-fit">
                        <Button className="flex items-center p-1.5 gap-1.5 rounded border border-[#DFE2E7] text-xs text-grey-40" onClick={() => toggleViewProfile(item)}>
                            View Profile
                            <User size="16" color="#333333"/>
                        </Button>
                        <Button as={Link} to={`/tasks/subordinates/${item?.id}`} className="flex items-center p-1.5 gap-1.5 rounded border border-[#DFE2E7] text-xs text-grey-40">
                            View Tasks
                            <Task size="16" color="#333333"/>
                        </Button>
                        <Button className="flex items-center p-1.5 gap-1.5 rounded border border-[#DFE2E7] text-xs text-grey-40" onClick={() => toggleCreateTask(item)}>
                            Create Task
                            <Add size="16" color="#333333"/>
                        </Button>
                    </div>
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
        <>
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="grid">
                    <h2 className="font-semibold text-xl text-black">Team members</h2>
                    <p className="font-normal text-xs text-[#727A86]">Here's info on your subordinates and their tasks assigned to them</p>
                </div>
                <div className="flex items-center gap-3 w-96">
                    <BaseSearch type="text" placeholder="Search..." defaultValue={value} onChange={onChangeHandler} />
                </div>
            </div>
            <RenderIf condition={!isLoading && !loadingSubordinates}>
                <Table
                    columns={columns}
                    data={subordinates?.data || []}
                    perPage={itemsPerPage}
                    page={Number(kraFilters.page)}
                    onPageChange={handlePageChange}
                    totalCount={subordinates?.total}
                    emptyStateText="We couldn't find any team member on the system."
                />
            </RenderIf>
            <RenderIf condition={isLoading || loadingSubordinates}>
                <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
            </RenderIf>
        </div>
        <CreateEmployeeTask user={toggleModals.activeEmployee as FetchedUserType} isOpen={toggleModals.openCreateEmployeeTask} close={() => toggleCreateTask(null)} />
        <ViewMemberProfile user={toggleModals.activeEmployee as FetchedUserType} isOpen={toggleModals.openViewProfile} close={() => toggleViewProfile(null)} />
        </>
    )
}