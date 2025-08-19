import {
  Button,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { useCallback, useState } from "react";
import { ArrowDown2, User } from "iconsax-react";
import { useDebounce } from "@/hooks/useDebounce";
import type { FetchedUserType } from "@/types/user";
import { Loader } from "@/components/core/Button/Loader";
import { useGetCurrentUser, useGetUsers } from "@/services/hooks/queries";
import { BaseButton, BaseSearch, RenderIf, Table } from "@/components/core";
import {
  getPaginationParams,
  updateQueryParams,
} from "@/hooks/usePaginationParams";
import { AppraisePerformance, EmployeeImprovementPlan, EmployeePerformanceRating, ImprovementPlan, ViewEmployeePerformance } from "@/components/page/employee-appraisal";
import DatePicker from "react-datepicker";
import { QuarterEnum } from "@/types/appraisal";
import { cn } from "@/lib/utils";

const quarters: { name: string; value: QuarterEnum }[] = [
  { name: "Q1", value: QuarterEnum.Q1 },
  { name: "Q2", value: QuarterEnum.Q2 },
  { name: "Q3", value: QuarterEnum.Q3 },
  { name: "Q4", value: QuarterEnum.Q4 },
];

export const SubordinateAppraisalPage = () => {
  const [itemsPerPage] = useState(10);
  const [quarter, setQuarter] = useState<QuarterEnum>(quarters[0].value);
  const [quarterName, setQuarterName] = useState(quarters[0].name);
  const [year, setYear] = useState(new Date().getFullYear());

  const searchParams = new URLSearchParams(location.search);
  const defaultFilters = getPaginationParams(searchParams, {
    page: 1,
    title: "",
  });
  const [kraFilters, setKraFilters] = useState(defaultFilters);

  const { value, onChangeHandler } = useDebounce(500);

  const { data: user, isLoading } = useGetCurrentUser();
  const { data: subordinates, isLoading: loadingSubordinates } = useGetUsers(
    {
      supervisor_id: user?.id?.toString(),
      page_size: itemsPerPage.toString(),
      search: value,
      page: kraFilters.page.toString(),
    },
    { enabled: !!user?.id }
  );

  const [activeEmployee, setActiveEmployee] = useState<null | FetchedUserType>(
    null
  );
  const [showAppraiseePerformance, setShowAppraiseePerformance] = useState(false);
  const [isReview, setIsReview] = useState(false);

  const [date] = useState<Date | null>(new Date());

  const toggleReviewPerformance = useCallback(
    (item: null | FetchedUserType) => {
      setActiveEmployee(item);
      setShowAppraiseePerformance(true);
      setIsReview(true);
    },
    []
  );

  const toggleViewProfile = useCallback((item: null | FetchedUserType) => {
    setActiveEmployee(item);
    setShowAppraiseePerformance(true);
    setIsReview(false);
  }, []);

  const [toggleModals2, setToggleModals2] = useState({
      openReviewPerformance: false,
      openViewPerformance: false,
      openRatePerformance: false,
      openImprovement: false,
      openImprovementPlan: false,
      activeEmployee: null as null | FetchedUserType,
    });
  
  
    const toggleReviewPerformance2 = useCallback(
      (item: null | FetchedUserType) => {
        setToggleModals2((prev) => ({
          ...prev,
          activeEmployee: item,
          openReviewPerformance: !toggleModals2.openReviewPerformance,
        }));
        setShowAppraiseePerformance(false);
      },
      [toggleModals2.openReviewPerformance]
    );

    const toggleRatePerformance2 = useCallback(
        (item: null | FetchedUserType) => {
          setToggleModals2((prev) => ({
            ...prev,
            activeEmployee: item,
            openRatePerformance: !toggleModals2.openRatePerformance,
          }));
        },
        [toggleModals2.openRatePerformance]
      );

      const toggleImprovement2 = useCallback(
          (item: null | FetchedUserType) => {
            setToggleModals2((prev) => ({
              ...prev,
              activeEmployee: item,
              openImprovement: !toggleModals2.openImprovement,
            }));
          },
          [toggleModals2.openImprovement]
        );

        const toggleImprovementPlan2 = useCallback(
            (item: null | FetchedUserType) => {
              setToggleModals2((prev) => ({
                ...prev,
                activeEmployee: item,
                openImprovementPlan: !toggleModals2.openImprovementPlan,
              }));
            },
            [toggleModals2.openImprovementPlan]
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
              View Appraisal
              <User size="16" color="#333333" />
            </Button>
            <Button
              className="flex items-center p-1.5 gap-1.5 rounded bg-green-primary-40 text-xs text-white-10"
              onClick={() => toggleReviewPerformance(item)}
            >
              Appraise Performance
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
          <div className="flex items-center gap-3 w-2/4">
            <BaseSearch
              type="text"
              placeholder="Search..."
              defaultValue={value}
              onChange={onChangeHandler}
            />

            {/* <BaseButton size="tiny" theme="primary" variant="outlined">
              <span className="whitespace-nowrap">Q1</span>
              <ArrowDown2 size="14" />
            </BaseButton> */}

            <Popover className="relative inline-block text-left">
              <PopoverButton
                as={BaseButton}
                size="tiny"
                theme="primary"
                variant="outlined"
              >
                <span className="whitespace-nowrap">{quarterName}</span>
                <ArrowDown2 size="14" />
              </PopoverButton>

              <PopoverPanel className="absolute z-10 bg-white-110 mt-1 w-full min-w-[70px] bg-white border border-gray-200 rounded-md shadow-lg">
                {quarters.map((q, i) => (
                  <button
                    key={i}
                    className={cn(
                      "w-full px-3 py-1.5 text-sm text-left hover:bg-gray-100",
                      q.value === quarter && "font-semibold text-green-600"
                    )}
                    onClick={() => {
                      setQuarter(q.value);
                      setQuarterName(q.name);
                    }}
                  >
                    {q.name}
                  </button>
                ))}
              </PopoverPanel>
            </Popover>

            {/* <BaseButton size="tiny" theme="primary" variant="outlined">
              <span className="whitespace-nowrap">2024</span>
              <ArrowDown2 size="14" />
            </BaseButton> */}

            <DatePicker
              selected={year ? new Date(year) : null}
              onChange={(v) => v && setYear(v.getFullYear())}
              showYearPicker
              dateFormat="yyyy"
              className="button button-tiny button-primary--outlined"
              customInput={
                <BaseButton size="tiny" theme="primary" variant="outlined">
                  {year}
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
      {activeEmployee && showAppraiseePerformance && (
        <AppraisePerformance
          isOpen={!!activeEmployee}
          close={() => setShowAppraiseePerformance(false)}
          allowEdit={isReview}
          employee={activeEmployee as FetchedUserType}
          quarter={quarter}
          year={year.toString()}
          success={() => {
            toggleReviewPerformance2(
              toggleModals2.activeEmployee as FetchedUserType
            );
            toggleRatePerformance2(toggleModals2.activeEmployee as FetchedUserType);
          }}
        />
      )}

      <ViewEmployeePerformance
        user={toggleModals2.activeEmployee as FetchedUserType}
        month={date?.getMonth() || 0}
        year={date?.getFullYear() || 0}
        isOpen={toggleModals2.openViewPerformance}
        close={() => toggleViewProfile(null)}
      />
      <EmployeePerformanceRating
        isOpen={toggleModals2.openRatePerformance}
        close={() => toggleRatePerformance2(null)}
        user={toggleModals2.activeEmployee as FetchedUserType}
        onImprovement={() => {
          toggleRatePerformance2(toggleModals2.activeEmployee as FetchedUserType);
          toggleImprovement2(toggleModals2.activeEmployee as FetchedUserType);
        }}
      />
      <EmployeeImprovementPlan
        isOpen={toggleModals2.openImprovement}
        close={() => toggleImprovement2(null)}
        user={toggleModals2.activeEmployee as FetchedUserType}
        onAssign={() => {
          toggleImprovement2(toggleModals2.activeEmployee as FetchedUserType);
          toggleImprovementPlan2(toggleModals2.activeEmployee as FetchedUserType);
        }}
      />
      <ImprovementPlan
        isOpen={toggleModals2.openImprovementPlan}
        close={() => toggleImprovementPlan2(null)}
        user={activeEmployee as FetchedUserType}
      />
    </>
  );
};
