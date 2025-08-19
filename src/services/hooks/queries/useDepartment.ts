import { GET_DEPARTMENT, GET_DEPARTMENTS } from "@/constants/queryKeys";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import type { FetchKRAsQuery } from "@/types/kra";
import { getDepartment, getDepartments } from "@/services/apis/department";
import type { FetchedDepartmentType } from "@/types/department";

export const useGetDepartment = (id: string, config?: Omit<UndefinedInitialDataOptions<any>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_DEPARTMENT, id],
        queryFn: () => getDepartment(id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedDepartmentType,
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