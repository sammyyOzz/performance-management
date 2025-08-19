import { GET_CURRENT_USER, GET_EXISTING_USERS, GET_USERS } from "@/constants/queryKeys";
import { type UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { getCurrentUser, getExistingUsers, getUser, getUsers } from "@/services/apis/user";
import { FetchedUserType, FetchExistingUsersQuery, FetchExistingUsersResponse, FetchUsersQuery } from "@/types/user";

export const useGetCurrentUser = (config?: Omit<UndefinedInitialDataOptions<any, Error, any, string[]>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_CURRENT_USER],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedUserType,
        retry: false,
    });
};

export const useGetUsers = (query: FetchUsersQuery, config?: Omit<UndefinedInitialDataOptions<any, Error, any, string[]>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_USERS, query as any],
        queryFn: () => getUsers(query),
        refetchOnWindowFocus: false,
        select: ({ data, ...rest }) => ({ data, ...rest }) as { data: FetchedUserType[]; page: number; total: number; page_size: number },
        retry: false,
    });
};

export const useGetUser = (id: string) => {
    return useQuery({
        enabled: !!id,
        queryKey: [GET_USERS, id],
        queryFn: () => getUser(id),
        refetchOnWindowFocus: false,
        select: (res) => res as FetchedUserType,
        retry: false,
    });
};

export const useGetExistingUsers = (query: FetchExistingUsersQuery, config?: Omit<UndefinedInitialDataOptions<any, Error, any, string[]>, "queryKey">) => {
    return useQuery({
        ...config,
        queryKey: [GET_EXISTING_USERS, query as any],
        queryFn: () => getExistingUsers(query),
        refetchOnWindowFocus: false,
        select: ({ data, ...rest }) => ({ data, ...rest }) as FetchExistingUsersResponse,
        retry: false,
    });
};