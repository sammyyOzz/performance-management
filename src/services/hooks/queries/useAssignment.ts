import { GET_ASSIGNMENT, GET_ASSIGNMENTS } from "@/constants/queryKeys";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getAssignment, getAssignments } from "@/services/apis/assignment";
import { FetchAssignmentsQuery, FetchedAssignmentType } from "@/types/assignment";

export const useGetAssignment = (id: string) => {
    return useQuery({
        queryKey: [GET_ASSIGNMENT, id],
        queryFn: () => getAssignment(id),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedAssignmentType,
        retry: false,
        enabled: !!id
    });
};

export const useGetAssignments = (query: FetchAssignmentsQuery, config?: Omit<UndefinedInitialDataOptions<any>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_ASSIGNMENTS, query],
        queryFn: () => getAssignments(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as FetchedAssignmentType[],
        retry: false,
    });
};