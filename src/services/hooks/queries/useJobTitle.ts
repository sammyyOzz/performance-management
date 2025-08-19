import { GET_JOB_TITLE, GET_JOB_TITLES } from "@/constants/queryKeys";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getJobTitle, getJobTitles } from "@/services/apis/job-title";
import { FetchUsersQuery } from "@/types/user";
import { FetchJobTitlesQuery, JobTitleResponse } from "@/types/job-title";

/**
 * Hook to fetch all job titles
 */
export const useGetJobTitles = (
  query?: FetchJobTitlesQuery, 
  config?: Omit<UndefinedInitialDataOptions<any, Error, any, any[]>, "queryKey">
) => {
    return useQuery({
        ...config,
        queryKey: [GET_JOB_TITLES, query as any],
        queryFn: () => getJobTitles(query),
        refetchOnWindowFocus: false,
        select: (res) => res as JobTitleResponse,
        retry: false,
    });
};

/**
 * Hook to fetch job titles with pagination and filters
 */
export const useGetJobTitle = (query: FetchUsersQuery, config?: Omit<UndefinedInitialDataOptions<any, Error, any, any[]>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_JOB_TITLE, query as any],
        queryFn: () => getJobTitle(query),
        refetchOnWindowFocus: false,
        retry: false,
    });
}; 