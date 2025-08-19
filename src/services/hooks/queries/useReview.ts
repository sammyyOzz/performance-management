import { GET_REVIEWS } from "@/constants/queryKeys";
import { getReviews } from "@/services/apis/review";
import { FetchedReviewType, FetchReviewsQuery } from "@/types/review";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

export const useGetReviews = (query: FetchReviewsQuery, config?: Omit<UndefinedInitialDataOptions<any, Error, any, string[]>, "queryKey">) => {
  return useQuery({
    ...config,
    queryKey: [GET_REVIEWS, query as any],
    queryFn: () => getReviews(query),
    refetchOnWindowFocus: false,
    select: ({ data, ...rest }) => ({ data, ...rest }) as { data: FetchedReviewType[]; page: number; total: number; page_size: number },
    retry: false,
  });
};