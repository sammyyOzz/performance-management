import { GET_DEPARTMENT, GET_DEPARTMENTS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import type { FetchKRAsQuery, SingleKraType } from "@/types/kra";
import { getDepartment, getDepartments } from "@/services/apis/department";
import type { FetchedDepartmentType } from "@/types/department";

export const useGetDepartment = (id: string) => {
    return useQuery({
        queryKey: [GET_DEPARTMENT, id],
        queryFn: () => getDepartment(id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as SingleKraType,
        retry: false,
        enabled: !!id
    });
};

export const useGetDepartments = (query: FetchKRAsQuery) => {
    return useQuery({
        queryKey: [GET_DEPARTMENTS, query],
        queryFn: () => getDepartments(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedDepartmentType[],
        retry: false,
    });
};