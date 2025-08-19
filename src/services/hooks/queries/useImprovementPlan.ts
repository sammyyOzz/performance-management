import { GET_IMPROVEMENT_PLANS } from "@/constants/queryKeys";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { FetchedImprovementPlanType, FetchImprovementPlansQuery } from "@/types/improvement-plan";
import { getImprovementPlans } from "@/services/apis/improvement-plan";


export const useGetImprovementPlans = (query: FetchImprovementPlansQuery, config?: Omit<UndefinedInitialDataOptions<any, Error, any, string[]>, "queryKey">) => {
  return useQuery({
      ...config,
      queryKey: [GET_IMPROVEMENT_PLANS, query as any],
      queryFn: () => getImprovementPlans(query),
      refetchOnWindowFocus: false,
      select: ({ data, ...rest }) => ({ data, ...rest }) as { data: FetchedImprovementPlanType[]; page: number; total: number; page_size: number },
      retry: false,
  });
};
