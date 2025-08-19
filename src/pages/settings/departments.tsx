import { useState } from "react"
import { useLocation } from "react-router"
import { Add, ArrowRight2 } from "iconsax-react"
import { Loader } from "@/components/core/Button/Loader"
import { FetchedDepartmentType } from "@/types/department"
import { AddDepartment } from "@/components/page/settings"
import { useGetDepartments } from "@/services/hooks/queries"
import { BaseButton, RenderIf, Table } from "@/components/core"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const DepartmentsPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )
    const { data, isLoading } = useGetDepartments({})
    const [openAddUser, setOpenAddUser] = useState(false)

    const columns = [
        {
            enableSorting: false,
            accessorKey: "department_name",
            header: () => "Department Name",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedDepartmentType
                return (
                    <span className="capitalize line-clamp-2 text-sm text-grey-40">{item?.name}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "hod",
            header: () => "Head of Department",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedDepartmentType
                return (
                    <span className="capitalize line-clamp-2 text-sm text-grey-40">{`${item?.department_head?.first_name || ""} ${item?.department_head?.last_name || ""}`}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "no_of_division",
            header: () => "No. of Division",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedDepartmentType
                return (
                    <span className="line-clamp-2">{item?.children?.filter((child) => child?.level === "division")?.length}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "no_of_branches",
            header: () => "No. of Branches",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedDepartmentType
                return (
                    <span className="line-clamp-2">{item?.children?.filter((child) => child?.level === "branch")?.length}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "no_of_sections",
            header: () => "No. of Sections",
            cell: ({ row }: { row: any }) => {
                const item = row?.original as FetchedDepartmentType
                return (
                    <span className="line-clamp-2">{item?.children?.filter((child) => child?.level === "section")?.length}</span>
                )
            }
        },
        {
            enableSorting: false,
            accessorKey: "action",
            header: () => "",
            cell: () => {
                return (
                    <BaseButton type="button" size="tiny" theme="primary" variant="outlined">
                        View
                        <ArrowRight2 size="14" />
                    </BaseButton>
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
                        <p className="font-normal text-xs text-[#727A86]">Create and manage all the departments in your organization.</p>
                    </div>
                    <BaseButton type="button" size="small" theme="primary" variant="filled" onClick={() => setOpenAddUser(true)}>
                        Add Department
                        <Add size="20" />
                    </BaseButton>
                </div>
                <div className="grid gap-8 p-6 bg-white-10 border border-[#DFE2E7] rounded-xl">
                    <RenderIf condition={!isLoading}>
                        <Table
                            columns={columns}
                            data={data || []}
                            perPage={itemsPerPage}
                            page={Number(kraFilters.page)}
                            onPageChange={handlePageChange}
                            totalCount={1}
                            emptyStateText="We couldn't find any department on the system."
                        />
                    </RenderIf>
                    <RenderIf condition={isLoading}>
                        <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center"><Loader className="spinner size-6 text-green-primary-40" /></div>
                    </RenderIf>
                </div>
            </div>
            <AddDepartment isOpen={openAddUser} close={() => setOpenAddUser(false)} />
        </section>
    )
}