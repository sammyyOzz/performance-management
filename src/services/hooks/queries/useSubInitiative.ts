import { GET_SUB_INITIATIVE, GET_SUB_INITIATIVES } from "@/constants/queryKeys";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getSubInitiative, getSubInitiatives } from "@/services/apis/sub-initiative";
import type { FetchedSingleSubInitiative, FetchedSubInitiative } from "@/types/sub-initiative";

export const useGetSubInitiative = (id: string) => {
    return useQuery({
        queryKey: [GET_SUB_INITIATIVE, id],
        queryFn: () => getSubInitiative(id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedSingleSubInitiative,
        retry: false,
        enabled: !!id
    });
};

export const useGetSubInitiatives = (query: any, config?: Omit<UndefinedInitialDataOptions<any>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_SUB_INITIATIVES, query],
        queryFn: () => getSubInitiatives(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedSubInitiative[],
        retry: false,
    });
};