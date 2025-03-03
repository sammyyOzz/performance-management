import { GET_CURRENT_USER } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/apis/user";

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [GET_CURRENT_USER],
        queryFn: getCurrentUser,
        refetchOnWindowFocus: false,
        select: (res) => res?.data as any,
        retry: false,
    });
};