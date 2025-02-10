import { useState } from "react"
import { Badge, Table } from "@/components/core"
import { useLocation } from "react-router"
import { getPaginationParams, updateQueryParams } from "@/hooks/usePaginationParams"

export const UsersPage = () => {
    const location = useLocation()
    const [itemsPerPage] = useState(15)
    const searchParams = new URLSearchParams(location.search)
    const [kraFilters, setKraFilters] = useState(
        getPaginationParams(searchParams, { page: 1 })
    )

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
    )
}