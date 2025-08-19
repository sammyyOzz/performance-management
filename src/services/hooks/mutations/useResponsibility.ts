import { GET_KRA } from "@/constants/queryKeys";
import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResponsibility } from "@/services/apis/responsibility";

export const useDeleteResponsibility = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteResponsibility,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_KRA] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};