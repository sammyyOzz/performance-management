import { GET_ROLES } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/services/apis/role";

export const useGetRoles = (query: any) => {
    return useQuery({
        queryKey: [GET_ROLES, query],
        queryFn: () => getRoles(query),
        refetchOnWindowFocus: false,
        select: (res) => res?.data as { id: 1; name: string; }[],
        retry: false,
    });
};