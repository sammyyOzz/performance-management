import { GET_KRAS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getKRA, getKRAs } from "@/services/apis/kra";
import type { FetchedKRAType, FetchKRAsQuery, SingleKraType } from "@/types/kra";

export const useGetKRA = (id: string) => {
    return useQuery({
        queryKey: [GET_KRAS, id],
        queryFn: () => getKRA(id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as SingleKraType,
        retry: false,
        enabled: !!id
    });
};

export const useGetKRAs = (query: FetchKRAsQuery) => {
    return useQuery({
        queryKey: [GET_KRAS, query],
        queryFn: () => getKRAs(query),
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedKRAType,
        retry: false,
    });
};