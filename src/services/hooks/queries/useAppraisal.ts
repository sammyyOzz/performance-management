import { GET_APPRAISALS } from "@/constants/queryKeys";
import { getAppraisals } from "@/services/apis/appraisal";
import { FetchAppraisalsQuery, FetchedAppraisalType } from "@/types/appraisal";
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";


export const useGetAppraisals = (query: FetchAppraisalsQuery, config?: Omit<UndefinedInitialDataOptions<any, Error, any, string[]>, "queryKey">) => {
  return useQuery({
      ...config,
      queryKey: [GET_APPRAISALS, query as any],
      queryFn: () => getAppraisals(query),
      refetchOnWindowFocus: false,
      select: (res) => res as FetchedAppraisalType,
      retry: false,
  });
};
