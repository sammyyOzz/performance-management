import { RenderIf } from "@/components/core";
import { Loader } from "@/components/core/Button/Loader";
import { ReviewCard } from "@/components/page/employee-appraisal/review-card";
import { ViewReview } from "@/components/page/employee-appraisal/view-review";
import { useGetCurrentUser } from "@/services/hooks/queries";
import { useGetReviews } from "@/services/hooks/queries/useReview";
import { FetchedReviewType } from "@/types/review";
import { useState } from "react";
import { format, parseISO } from "date-fns";

export const PersonalMonthlyPerformancePage = () => {
  const { data: user, isLoading: isCurrentUserLoading } = useGetCurrentUser();
  const { isLoading: isGetReviewsLoading, data: reviewsData } = useGetReviews({
    user_id: user?.id?.toString(),
  });
//   console.log("reviews data", reviewsData);

  const [reviewData, setReviewData] = useState<FetchedReviewType | null>(null);

  const getDisplayText = (item: FetchedReviewType) => {
    const date = parseISO(item?.created_at || new Date().toISOString());
    const formattedDate = format(date, "LLLL, yyyy");
    return `Review for ${formattedDate}`;
  }

  return (
    <>
      <RenderIf condition={isCurrentUserLoading || isGetReviewsLoading}>
        <div className="flex flex-col h-3/4 gap-10 max-w-screen-2xl mx-auto items-center justify-center">
          <Loader className="spinner size-6 text-green-primary-40" />
        </div>
      </RenderIf>
      <RenderIf condition={!isCurrentUserLoading && !isGetReviewsLoading}>
        <div className="grid grid-cols-3 gap-x-5 gap-y-8">
          {reviewsData?.data?.map((task, index) => (
            <ReviewCard
              key={index}
              index={index}
              displayText={getDisplayText(task)}
              toggleReviewOpen={() => setReviewData(task)}
            />
          ))}
        </div>
      </RenderIf>
      <ViewReview
        isOpen={!!reviewData}
        close={() => setReviewData(null)}
        review={reviewData}
      />
    </>
  );
};
