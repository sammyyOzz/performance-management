import { FC, useState } from "react";
import useMeasure from "react-use-measure";
import { InfoCircle } from "iconsax-react";
import { Icon } from "@iconify-icon/react";
import riCloseFill from "@iconify-icons/ri/close-fill";
import { motion, MotionConfig } from "motion/react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  BaseButton,
  BaseInput,
  RenderIf,
  Table,
  TextArea,
} from "@/components/core";
import { useFormikWrapper } from "@/hooks/useFormikWrapper";
// import { FetchedAppraiseeTaskType } from "@/types/appraisal";
import {
  getPaginationParams,
  updateQueryParams,
} from "@/hooks/usePaginationParams";
// import { appraiseeTasks } from "./mock";
import { FetchedUserType } from "@/types/user";
import {
  useGetAppraisals,
  useGetAssignments,
  useGetCurrentUser,
  useGetUser,
} from "@/services/hooks/queries";
import { FetchedAssignmentType } from "@/types/assignment";
import { Loader } from "@/components/core/Button/Loader";
import { CreateAppraisalSchema } from "@/validations/appraisal";
import { useCreateAppraisal } from "@/services/hooks/mutations/useAppraisal";
import { QuarterEnum } from "@/types/appraisal";

interface AppraisePerformanceProps {
  isOpen: boolean;
  close: () => void;
  allowEdit: boolean;
  employee: FetchedUserType;
  quarter: QuarterEnum;
  year: string;
  success?: () => void;
}

const AlertNoteCmp = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-x-3 p-3 text-xs w-fit rounded-sm text-green-secondary-40 bg-green-secondary-10">
      <InfoCircle size="14" color="#0f973d" />
      <p>{text}</p>
    </div>
  );
};

export const AppraisePerformance: FC<AppraisePerformanceProps> = ({
  isOpen,
  close,
  allowEdit,
  employee,
  quarter,
  year,
  success
}) => {
  const [ref, bounds] = useMeasure();
  const [itemsPerPage] = useState(10);

  const { data: currentUser, isLoading: isLoadingCurrentUser } =
    useGetCurrentUser();
  const {
    data: currentUserSuperVisor,
    isLoading: isLoadingCurrentUserSupervisor,
  } = useGetUser(currentUser?.supervisor_id?.toString() || "");

  const { data: assignments, isLoading: isLoadingAssignments } =
    useGetAssignments({ user_id: employee.id, page_size: itemsPerPage });

  const { data: appraisalData, isLoading: isLoadingAppraisals } = useGetAppraisals(
    {
      user_id: employee.id?.toString(),
      quarter,
      year,
    })


  const {
    mutate: createAppraisalMutation,
    isPending: isCreateAppraisalPending,
  } = useCreateAppraisal(() => onSuccess());

  const { handleSubmit, register, resetForm, values } = useFormikWrapper({
    initialValues: {
      communication_skills: appraisalData?.[0]?.communication_skills || "",
      communication_skills_score: appraisalData?.[0]?.communication_skills_score || "",
      transparency: appraisalData?.[0]?.transparency || "",
      transparency_score: appraisalData?.[0]?.transparency_score || "",
      knowledge: appraisalData?.[0]?.knowledge || "",
      knowledge_score: appraisalData?.[0]?.knowledge_score || "",
      development: appraisalData?.[0]?.development || "",
      development_score: appraisalData?.[0]?.development_score || "",
      integrity: appraisalData?.[0]?.integrity || "",
      integrity_score: appraisalData?.[0]?.integrity_score || "",
      commitment: appraisalData?.[0]?.commitment || "",
      commitment_score: appraisalData?.[0]?.commitment_score || "",
      innovation_comment: appraisalData?.[0]?.innovation_comment || "",
      innovation_score: appraisalData?.[0]?.innovation_score || "",
      turn_around_comment: appraisalData?.[0]?.turn_around_comment || "",
      turn_around_score: appraisalData?.[0]?.turn_around_score || "",
      punctuality_comment: appraisalData?.[0]?.punctuality_comment || "",
      punctuality_score: appraisalData?.[0]?.punctuality_score || "",
      comments: appraisalData?.[0]?.comments || "",
    },
    enableReinitialize: true,
    validationSchema: CreateAppraisalSchema,
    onSubmit: () => {
      createAppraisalMutation({
        ...values,
        communication_skills_score: Number(values.communication_skills_score),
        transparency_score: Number(values.transparency_score),
        knowledge_score: Number(values.knowledge_score),
        development_score: Number(values.development_score),
        integrity_score: Number(values.integrity_score),
        commitment_score: Number(values.commitment_score),
        innovation_score: Number(values.innovation_score),
        turn_around_score: Number(values.turn_around_score),
        punctuality_score: Number(values.punctuality_score),
        appraisee_id: employee.id,
        appraiser_id: currentUser?.id || 0,
        counter_signing_officer_id: currentUserSuperVisor?.id || 0,
        assignment_ids: assignments?.map((item) => item.id) || [],
      });
    },
  });

  const onClose = () => {
    close();
    resetForm();
  };

  const onSuccess = () => {
    onClose;
    if (success) {
      success();
    }
  }

  const columns = [
    {
      enableSorting: false,
      accessorKey: "kpi_task",
      header: () => "KPI Tasks",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return (
          <span className="line-clamp-2">{item?.sub_initiative?.name || "Not assigned"}</span>
        );
      },
    },
    {
      enableSorting: false,
      accessorKey: "target_set",
      header: () => "Target Set",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return (
          <span className="line-clamp-2">{item?.sub_initiative?.target || "Not assigned"}</span>
        );
      },
    },
    {
      accessorKey: "target_achieved",
      header: () => "Target Achieved",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return <span className="line-clamp-2">{item?.achieved || 0}%</span>;
      },
    },
    {
      accessorKey: "weight",
      header: () => "Weight",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return <span className="line-clamp-2 text-left">{item?.weight || 0}%</span>;
      },
    },
    {
      accessorKey: "graded_weight",
      header: () => "Graded Weight",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return <span className="line-clamp-2 text-left">{item?.graded_weight || 0}%</span>;
      },
    },
    {
      accessorKey: "weighted_score",
      header: () => "Weighted Score",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return <span className="line-clamp-2 text-left">{item?.weighted_score || 0}</span>;
      },
    },
    {
      accessorKey: "grade",
      header: () => "Grade",
      cell: ({ row }: { row: any }) => {
        const item = row?.original as FetchedAssignmentType;
        return (
          <span className="line-clamp-2 text-left">{item?.grade}</span>
        );
      },
    },
  ];

  const searchParams = new URLSearchParams(location.search);
  const defaultFilters = getPaginationParams(searchParams, {
    page: 1,
    title: "",
  });

  const [appraiseePerformanceFilters, setAppraiseePerformanceFilters] =
    useState(defaultFilters);

  const handlePageChange = async (page: number) => {
    // in a real page, this function would paginate the data from the backend
    setAppraiseePerformanceFilters((prev) => {
      const updatedFilters = { ...prev, page };
      updateQueryParams(updatedFilters); // Use the updated filters directly
      return updatedFilters;
    });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={() => close()}
    >
      <DialogBackdrop
        className="fixed inset-0 bg-[#FDFDFD] duration-300 ease-out transition-all"
        style={{ backdropFilter: "blur(4px)" }}
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex flex-col min-h-full items-center justify-start gap-8 px-20 pb-10">
          <div className="flex items-center justify-between w-full py-8">
            <h1 className="text-xl font-semibold text-gray-900">
              Performance Appraisal
            </h1>
            <button
              onClick={() => close()}
              className="flex items-center py-3 px-5 gap-2 rounded-lg bg-[#F5F6F7] border border-[#F0F1F4]"
            >
              Close
              <Icon icon={riCloseFill} width={20} height={20} />
            </button>
          </div>

          <MotionConfig
            transition={{ duration: 0.5, type: "spring", bounce: 0 }}
          >
            <DialogPanel
              as={motion.div}
              animate={{ height: bounds.height }}
              className="w-full ease-out data-[closed]:scale-90 data-[closed]:opacity-0 duration-500"
            >
              <RenderIf
                condition={
                  isLoadingCurrentUser || isLoadingCurrentUserSupervisor
                }
              >
                <div className="flex flex-col h-52 items-center justify-center">
                  <Loader className="spinner size-6 text-green-primary-40" />
                </div>
              </RenderIf>
              <RenderIf
                condition={
                  !isLoadingCurrentUser && !isLoadingCurrentUserSupervisor
                }
              >
                <div ref={ref} className="w-full grid gap-y-11">
                  {/* <form className="w-full grid gap-y-11"> */}
                  <div className="w-full border border-grey-110 rounded-lg p-6 grid gap-y-4">
                    <h2 className="text-xl font-semibold">Appraisal Period</h2>

                    <div className="grid grid-cols-2 gap-8">
                      <BaseInput
                        type="date"
                        label="From"
                        // {...appraisePerformanceForm.register(
                        //   "appraisalPeriodFrom"
                        // )}
                      />
                      <BaseInput
                        type="date"
                        label="To"
                        // {...appraisePerformanceForm.register(
                        //   "appraisalPeriodTo"
                        // )}
                      />
                    </div>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-8">
                    <div className="border border-grey-110 rounded-lg p-6">
                      <h2 className="text-xl font-semibold">
                        Appraisee's detail
                      </h2>

                      <div className="grid gap-6">
                        <BaseInput
                          type="text"
                          label="Name of Staff"
                          defaultValue={`${employee?.first_name} ${employee?.last_name}`}
                          disabled
                          // {...appraisePerformanceForm.register("appraiseeName")}
                        />

                        <div className="grid grid-cols-2 gap-6">
                          <BaseInput
                            type="text"
                            label="Department"
                            defaultValue={employee?.department_name}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "appraiseeDepartment"
                            // )}
                          />

                          <BaseInput
                            type="text"
                            label="Designation"
                            defaultValue={employee?.position}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "appraiseeDesignation"
                            // )}
                          />

                          <BaseInput
                            type="text"
                            label="IPPIS No."
                            // defaultValue={employee?.ippis_no}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "appraiseeIppisNo"
                            // )}
                          />

                          <BaseInput
                            type="text"
                            label="Rank"
                            // defaultValue={employee?.rank}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "appraiseeRank"
                            // )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="border border-grey-110 rounded-lg p-6">
                      <h2 className="text-xl font-semibold">
                        Counter Signing Officer details
                      </h2>

                      <div className="grid gap-6">
                        <BaseInput
                          type="text"
                          label="Name of Staff"
                          defaultValue={`${
                            currentUserSuperVisor?.first_name || "--"
                          } ${currentUserSuperVisor?.last_name || "--"}`}
                          disabled
                          // {...appraisePerformanceForm.register(
                          //   "contractOfficerName"
                          // )}
                        />

                        <div className="grid grid-cols-2 gap-6">
                          <BaseInput
                            type="text"
                            label="Department"
                            defaultValue={
                              currentUserSuperVisor?.department_name
                            }
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "contractOfficerDepartment"
                            // )}
                          />

                          <BaseInput
                            type="text"
                            label="Designation"
                            defaultValue={currentUserSuperVisor?.position}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "contractOfficerDesignation"
                            // )}
                          />

                          <BaseInput
                            type="text"
                            label="IPPIS No."
                            // defaultValue={currentUserSuperVisor?.ippis_no}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "contractOfficerIppisNo"
                            // )}
                          />

                          <BaseInput
                            type="text"
                            label="Rank"
                            // defaultValue={currentUserSuperVisor?.rank}
                            disabled
                            // {...appraisePerformanceForm.register(
                            //   "contractOfficerRank"
                            // )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border border-grey-110 rounded-lg p-6 grid gap-y-4">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2">
                      <h2 className="text-2xl font-semibold">Section 4: Appraisee's Tasks</h2>

                      <div className="flex items-end lg:items-center flex-col lg:flex-row gap-4">
                        <AlertNoteCmp text="This section is populated when an employee tasks are done during the expected period of time." />
                      </div>
                    </div>

                    <Table
                      columns={columns}
                      loading={isLoadingAssignments}
                      data={assignments || []}
                      perPage={itemsPerPage}
                      page={Number(appraiseePerformanceFilters.page)}
                      onPageChange={handlePageChange}
                      totalCount={30}
                      paginateData={false}
                      emptyStateText="We couldn't find any Appraisee tasks on the system."
                    />

                    <div className="grid grid-cols-2 gap-8 mt-4">
                      <div className="border border-grey-110 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Sum of Weighted Score</h3>
                        <p className="text-2xl font-bold">
                          {((assignments?.reduce((acc, task) => acc + (task.weighted_score || 0), 0) || 0) / 100).toFixed(2)}
                        </p>
                      </div>
                      <div className="border border-grey-110 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Composite Weighted Score (70%)</h3>
                        <p className="text-2xl font-bold">
                          {(((assignments?.reduce((acc, task) => acc + (task.weighted_score || 0), 0) || 0) / 100) * 0.7).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <RenderIf condition={isLoadingAppraisals}>
                    <div className="flex flex-col h-52 items-center justify-center">
                      <Loader className="spinner size-6 text-green-primary-40" />
                    </div>
                  </RenderIf>

                  <RenderIf condition={!isLoadingAppraisals}>
                  <form
                    onSubmit={handleSubmit}
                    className="w-full grid gap-y-11"
                  >
                    <div className="w-full border border-white-50 rounded-lg p-8 grid gap-y-8">
                      <h2 className="text-2xl font-semibold">Section 5: Competencies</h2>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Effective Communication and Memo writing skills
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("communication_skills")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={2}
                            {...register("communication_skills_score")}
                          />

                          <AlertNoteCmp text="Maximum score is 2" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Transparency and Accountability
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("transparency")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={2}
                            {...register("transparency_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 2" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Knowledge of HSE Legislations and Policies
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("knowledge")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={4}
                            {...register("knowledge_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 4" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Development of projects and programs on HSE issues
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("development")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={4}
                            {...register("development_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 4" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Integrity
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("integrity")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={4}
                            {...register("integrity_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 4" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Commitment
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("commitment")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={4}
                            {...register("commitment_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 4" />
                        </div>
                      </div>

                      <div className="mt-4 border-t pt-4">
                        <BaseInput
                          type="text"
                          label="Sub-total rating from competencies"
                          value={
                            ((Number(values.communication_skills_score) || 0) +
                            (Number(values.transparency_score) || 0) +
                            (Number(values.knowledge_score) || 0) +
                            (Number(values.development_score) || 0) +
                            (Number(values.integrity_score) || 0) +
                            (Number(values.commitment_score) || 0) +
                            (Number(values.punctuality_score) || 0) +
                            (Number(values.turn_around_score) || 0) +
                            (Number(values.innovation_score) || 0)).toFixed(2)
                          }
                          disabled
                        />
                        <div className="mt-2">
                          <AlertNoteCmp text="Maximum total score for competencies is 20" />
                        </div>
                      </div>
                    </div>

                    <div className="w-full border border-white-50 rounded-lg p-8 grid gap-y-8">
                      <h2 className="text-2xl font-semibold">Section 6: Operations and Processes</h2>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Punctuality/Attendance
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("punctuality_comment")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={3}
                            {...register("punctuality_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 3" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Work turn around time
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("turn_around_comment")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={3}
                            {...register("turn_around_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 3" />
                        </div>
                      </div>

                      <div className="grid gap-y-3">
                        <h4 className="font-semibold text-grey-40">
                          Innovation on the Job
                        </h4>

                        <TextArea
                          label="Define their skill"
                          placeholder="Write a comment"
                          disabled={!allowEdit}
                          {...register("innovation_comment")}
                        />

                        <div className="grid gap-y-2">
                          <BaseInput
                            type="number"
                            label="Score"
                            disabled={!allowEdit}
                            min={0}
                            max={4}
                            {...register("innovation_score")}
                          />
                          <AlertNoteCmp text="Maximum score is 4" />
                        </div>
                      </div>
                      <div className="mt-2">
                          <AlertNoteCmp text="Maximum total score for operations and processes is 10" />
                        </div>
                    </div>

                    <div className="w-full border border-grey-110 rounded-lg p-6 grid gap-y-4">
                      <h2 className="text-xl font-semibold">Overall Rating</h2>

                      <div className="flex items-center gap-8">
                        <BaseInput
                          type="text"
                          label="Sub-total rating from tasks (70%)"
                          value={(((assignments?.reduce((acc, task) => acc + (task.weighted_score || 0), 0) || 0) / 100) * 0.7).toFixed(2)}
                          disabled
                        />

                        <p className="text-3xl font-semibold">+</p>

                        <BaseInput
                          type="text"
                          label="Sub-total rating from Section 5 and 6 (30%)"
                          value={
                            ((Number(values.communication_skills_score) || 0) +
                            (Number(values.transparency_score) || 0) +
                            (Number(values.knowledge_score) || 0) +
                            (Number(values.development_score) || 0) +
                            (Number(values.integrity_score) || 0) +
                            (Number(values.commitment_score) || 0) +
                            (Number(values.punctuality_score) || 0) +
                            (Number(values.turn_around_score) || 0) +
                            (Number(values.innovation_score) || 0))
                          }
                          disabled
                        />

                        <p className="text-3xl font-semibold">=</p>

                        <BaseInput
                          type="text"
                          label="Overall appraisal rating (100%)"
                          value={
                            (((assignments?.reduce((acc, task) => acc + (task.weighted_score || 0), 0) || 0) / 100) * 0.7) +
                            ((Number(values.communication_skills_score) || 0) +
                            (Number(values.transparency_score) || 0) +
                            (Number(values.knowledge_score) || 0) +
                            (Number(values.development_score) || 0) +
                            (Number(values.integrity_score) || 0) +
                            (Number(values.commitment_score) || 0) +
                            (Number(values.punctuality_score) || 0) +
                            (Number(values.turn_around_score) || 0) +
                            (Number(values.innovation_score) || 0)) * 0.3
                          }
                          disabled
                        />
                      </div>

                      <div className="mt-4">
                        <AlertNoteCmp text="Tasks contribute 70% and competencies contribute 30% to the overall rating" />
                      </div>

                      <div className="mt-4">
                        <BaseInput
                          type="text"
                          label="Appraiser Score (20%)"
                          value={
                            ((((assignments?.reduce((acc, task) => acc + (task.weighted_score || 0), 0) || 0) / 100) * 0.7) +
                            ((Number(values.communication_skills_score) || 0) +
                            (Number(values.transparency_score) || 0) +
                            (Number(values.knowledge_score) || 0) +
                            (Number(values.development_score) || 0) +
                            (Number(values.integrity_score) || 0) +
                            (Number(values.commitment_score) || 0) +
                            (Number(values.innovation_score) || 0) +
                            (Number(values.turn_around_score) || 0) +
                            (Number(values.punctuality_score) || 0)) / 30 * 0.3) * 0.2
                          }
                          disabled
                        />
                        <div className="mt-2">
                          <AlertNoteCmp text="Appraiser score is 20% of the overall appraisal rating" />
                        </div>
                      </div>

                      <BaseInput
                        type="text"
                        label="Summary"
                        {...register("comments")}
                      />
                    </div>

                    <BaseButton
                      type="submit"
                      size="large"
                      theme="primary"
                      variant="filled"
                      block
                      loading={isCreateAppraisalPending}
                      disabled={isCreateAppraisalPending || !allowEdit}
                    >
                      Submit
                    </BaseButton>
                  </form>
                  </RenderIf>
                  {/* </form> */}
                </div>
              </RenderIf>
            </DialogPanel>
          </MotionConfig>
        </div>
      </div>
    </Dialog>
  );
};
