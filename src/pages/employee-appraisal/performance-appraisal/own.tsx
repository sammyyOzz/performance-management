import { BaseButton, RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { AppraisePerformance } from "@/components/page/employee-appraisal";
import { ReviewCard } from "@/components/page/employee-appraisal/review-card";
import { useGetCurrentUser } from "@/services/hooks/queries";
import { QuarterEnum } from "@/types/appraisal";
import { FetchedUserType } from "@/types/user";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import DatePicker from "react-datepicker";

const quarters = [
  { name: "Jan - March", value: QuarterEnum.Q1 },
  { name: "April - June", value: QuarterEnum.Q2 },
  { name: "July - Sept", value: QuarterEnum.Q3 },
  { name: "Oct - Dec", value: QuarterEnum.Q4 },
];

export const PersonalAppraisalPage = () => {
  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUser();

  const [year, setYear] = useState(new Date().getFullYear());
  const [quarter, setQuarter] = useState<QuarterEnum | null>(null);

  return (
    <>
      <div>
        <div className="flex items-center gap-3 w-2/4 mb-8">
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

        <RenderIf condition={isCurrentUserLoading}>
          <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
            <Loader className="spinner size-6 text-green-primary-40" />
          </div>
        </RenderIf>

        <RenderIf condition={!isCurrentUserLoading}>
          <div className="grid grid-cols-3 gap-x-5 gap-y-8">
            {quarters.map((quarter, index) => (
              <ReviewCard
                key={index}
                index={index}
                displayText={"Appraisal for " + quarter.name}
                toggleReviewOpen={() => setQuarter(quarter.value)}
              />
            ))}
          </div>
        </RenderIf>
      </div>

      {quarter && (
        <AppraisePerformance
          isOpen={!!quarter}
          close={() => setQuarter(null)}
          allowEdit={false}
          employee={currentUser as FetchedUserType}
          quarter={quarter}
          year={year.toString()}
        />
      )}
    </>
  );
};
