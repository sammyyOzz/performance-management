import { Button } from "@headlessui/react";
import { useCallback, useState } from "react";
import { ArrowDown2, User } from "iconsax-react";
import { useDebounce } from "@/hooks/useDebounce";
import type { FetchedUserType } from "@/types/user";
import { Loader } from "@/components/core/Button/Loader";
import { useGetCurrentUser, useGetUsers } from "@/services/hooks/queries";
import { BaseButton, BaseSearch, RenderIf, Table } from "@/components/core";
import {
  EmployeeImprovementPlan,
  EmployeePerformanceRating,
  ImprovementPlan,
  ReviewEmployeePerformance,
  ViewEmployeePerformance,
} from "@/components/page/employee-appraisal";
import {
  getPaginationParams,
  updateQueryParams,
} from "@/hooks/usePaginationParams";
import DatePicker from "react-datepicker";

export const SubordinatesMonthlyPerformancePage = () => {
  const [itemsPerPage] = useState(10);
  const { value, onChangeHandler } = useDebounce(500);

  const searchParams = new URLSearchParams(location.search);
  const defaultFilters = getPaginationParams(searchParams, {
    page: 1,
    title: "",
  });
  const [kraFilters, setKraFilters] = useState(defaultFilters);

  const { data: user, isLoading } = useGetCurrentUser();

  const { data: subordinates, isLoading: loadingSubordinates } = useGetUsers(
    {
      supervisor_id: user?.id?.toString(),
      page_size: itemsPerPage.toString(),
      search: value,
      page: kraFilters.page.toString()
    },
    {
      enabled: !!user?.id,
    }
  );

  const [toggleModals, setToggleModals] = useState({
    openReviewPerformance: false,
    openViewPerformance: false,
    openRatePerformance: false,
    openImprovement: false,
    openImprovementPlan: false,
    activeEmployee: null as null | FetchedUserType,
  });

  const [date, setDate] = useState<Date | null>(new Date());

  const toggleReviewPerformance = useCallback(
    (item: null | FetchedUserType) => {
      setToggleModals((prev) => ({
        ...prev,
        activeEmployee: item,
        openReviewPerformance: !toggleModals.openReviewPerformance,
      }));
    },
    [toggleModals.openReviewPerformance]
  );

  const toggleViewProfile = useCallback(
    (item: null | FetchedUserType) => {
      setToggleModals((prev) => ({
        ...prev,
        activeEmployee: item,
        openViewPerformance: !toggleModals.openViewPerformance,
      }));
    },
    [toggleModals.openViewPerformance]
  );

  const toggleRatePerformance = useCallback(
    (item: null | FetchedUserType) => {
      setToggleModals((prev) => ({
        ...prev,
        activeEmployee: item,
        openRatePerformance: !toggleModals.openRatePerformance,
      }));
    },
    [toggleModals.openRatePerformance]
  );

  const toggleImprovement = useCallback(
    (item: null | FetchedUserType) => {
      setToggleModals((prev) => ({
        ...prev,
        activeEmployee: item,
        openImprovement: !toggleModals.openImprovement,
      }));
    },
    [toggleModals.openImprovement]
  );

  const toggleImprovementPlan = useCallback(
    (item: null | FetchedUserType) => {
      setToggleModals((prev) => ({
        ...prev,
        activeEmployee: item,
        openImprovementPlan: !toggleModals.openImprovementPlan,
      }));
    },
    [toggleModals.openImprovementPlan]
  );

  const columns = [
    {
      enableSorting: false,
      accessorKey: "name",
      header: () => "Appraisee's Name",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedUserType;
        return (
          <div className="flex flex-col">
            <h3 className="text-sm text-grey-40 capitalize">
              {item?.first_name} {item?.last_name}
            </h3>
            <p className="text-xs text-[#939393]">{item?.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: () => "Job role",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedUserType;
        return <span className="line-clamp-2">{item?.position}</span>;
      },
    },
    {
      enableSorting: false,
      accessorKey: "action",
      header: () => "Action",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedUserType;
        return (
          <div className="flex items-center justify-end gap-4 w-fit">
            <Button
              className="flex items-center p-1.5 gap-1.5 rounded border border-[#DFE2E7] text-xs text-grey-40"
              onClick={() => toggleViewProfile(item)}
            >
              View Performance
              <User size="16" color="#333333" />
            </Button>
            <Button
              className="flex items-center p-1.5 gap-1.5 rounded bg-green-primary-40 text-xs text-white-10"
              onClick={() => toggleReviewPerformance(item)}
            >
              Review Performance
              <User size="16" color="#FFFFFF" />
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
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 w-1/3">
            <BaseSearch
              type="text"
              placeholder="Search..."
              defaultValue={value}
              onChange={onChangeHandler}
            />

            <DatePicker
              selected={date}
              onChange={(v) => setDate(v)}
              dateFormat="MM/yyyy" // Show month + year format
              showMonthYearPicker // <-- This is the key change!
              className="button button-tiny button-primary--outlined w-[200px]"
              customInput={
                <BaseButton size="small" theme="primary" variant="outlined">
                  {date
                    ? `${date.toLocaleString("default", {
                        month: "long",
                      })}, ${date.getFullYear()}`
                    : "Select Date"}
                  <ArrowDown2 size="14" />
                </BaseButton>
              }
            />
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
          <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
            <Loader className="spinner size-6 text-green-primary-40" />
          </div>
        </RenderIf>
      </div>
      <ReviewEmployeePerformance
        isOpen={toggleModals.openReviewPerformance}
        close={() => toggleReviewPerformance(null)}
        user={toggleModals.activeEmployee as FetchedUserType}
        success={() => {
          return;
          toggleReviewPerformance(
            toggleModals.activeEmployee as FetchedUserType
          );
          toggleRatePerformance(toggleModals.activeEmployee as FetchedUserType);
        }}
      />
      <ViewEmployeePerformance
        user={toggleModals.activeEmployee as FetchedUserType}
        month={date?.getMonth() || 0}
        year={date?.getFullYear() || 0}
        isOpen={toggleModals.openViewPerformance}
        close={() => toggleViewProfile(null)}
      />
      <EmployeePerformanceRating
        isOpen={toggleModals.openRatePerformance}
        close={() => toggleRatePerformance(null)}
        user={toggleModals.activeEmployee as FetchedUserType}
        onImprovement={() => {
          toggleRatePerformance(toggleModals.activeEmployee as FetchedUserType);
          toggleImprovement(toggleModals.activeEmployee as FetchedUserType);
        }}
      />
      <EmployeeImprovementPlan
        isOpen={toggleModals.openImprovement}
        close={() => toggleImprovement(null)}
        user={toggleModals.activeEmployee as FetchedUserType}
        onAssign={() => {
          toggleImprovement(toggleModals.activeEmployee as FetchedUserType);
          toggleImprovementPlan(toggleModals.activeEmployee as FetchedUserType);
        }}
      />
      <ImprovementPlan
        isOpen={toggleModals.openImprovementPlan}
        close={() => toggleImprovementPlan(null)}
        user={toggleModals.activeEmployee as FetchedUserType}
      />
    </>
  );
};
