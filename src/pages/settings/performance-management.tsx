import { useState } from "react";
import { useLocation } from "react-router";
import { Add } from "iconsax-react";
import { Icon } from "@iconify-icon/react";
import { Button } from "@headlessui/react";
import { Badge, BaseButton, RenderIf, Table } from "@/components/core";
import { CreatePerformanceReviewCycle } from "@/components/page/settings";
import {
  getPaginationParams,
  updateQueryParams,
} from "@/hooks/usePaginationParams";
import { Loader } from "@/components/core/Button/Loader";
import { reviewCycles } from "@/components/page/settings/mock";
import { FetchedReviewCycleType } from "@/types/performance-management";

export const PerformanceSettings = () => {
  const location = useLocation();
  const [itemsPerPage] = useState(15);
  const searchParams = new URLSearchParams(location.search);
  const [kraFilters, setKraFilters] = useState(
    getPaginationParams(searchParams, { page: 1 })
  );
  const isLoading = false;
  const [openCreateReviewCycle, setOpenCreateReviewCycle] = useState(false);

  const columns = [
    {
      enableSorting: false,
      accessorKey: "name",
      header: () => "Name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedReviewCycleType;
        return (
          <span className="capitalize line-clamp-2 text-sm text-grey-40">
            {item?.name}
          </span>
        );
      },
    },
    {
      enableSorting: false,
      accessorKey: "number_of_employees",
      header: () => "Number of Staff",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedReviewCycleType;
        return (
          <span className="capitalize line-clamp-2 text-sm text-grey-40">
            {item.employeeCount}
          </span>
        );
      },
    },
    {
      enableSorting: false,
      accessorKey: "status",
      header: () => "Status",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedReviewCycleType;
        return (
          <span className="line-clamp-2">
            <RenderIf condition={item.status === "active"}>
              <Badge status="done" label="Active" />
            </RenderIf>

            <RenderIf condition={item.status === "inactive"}>
              <Badge status="warning" label="Inactive" />
            </RenderIf>
          </span>
        );
      },
    },
    {
      enableSorting: false,
      accessorKey: "action",
      header: () => "",
      cell: () => {
        return (
          <div className="flex items-start">
            <Button
              type="button"
              className="p-2 rounded-lg border border-grey-110 flex justify-center items-center"
            >
              <Icon icon="vaadin:ellipsis-dots-v" className="size-4" />
            </Button>
          </div>
        );
      },
    },
  ];

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
            <h1 className="font-semibold text-xl text-black">
              Performance Management
            </h1>
            <p className="font-normal text-xs text-[#727A86]">
              Create and manage performance reviews across the organisation
            </p>
          </div>
          <BaseButton
            type="button"
            size="small"
            theme="primary"
            variant="filled"
            onClick={() => setOpenCreateReviewCycle(true)}
          >
            Create a review cycle
            <Add size="20" />
          </BaseButton>
        </div>

        <div className="grid gap-y-8 bg-white-10 border border-[#DFE2E7] rounded-xl p-6">
          <div className="grid gap-y-0.5">
            <h1 className="font-semibold text-xl text-black">Review Cycle</h1>
            <p className="font-normal text-xs text-grey-130">
              Edit your account information and save the changes.
            </p>
          </div>

          <RenderIf condition={!isLoading}>
            <Table
              columns={columns}
              data={reviewCycles || []}
              perPage={itemsPerPage}
              page={Number(kraFilters.page)}
              onPageChange={handlePageChange}
              totalCount={1}
              emptyStateText="We couldn't find any review cycles on the system."
            />
          </RenderIf>

          <RenderIf condition={isLoading}>
            <div className="flex flex-col flex-1 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
              <Loader className="spinner size-6 text-green-primary-40" />
            </div>
          </RenderIf>
        </div>
      </div>

      <CreatePerformanceReviewCycle
        isOpen={openCreateReviewCycle}
        close={() => setOpenCreateReviewCycle(false)}
      />
    </section>
  );
};
