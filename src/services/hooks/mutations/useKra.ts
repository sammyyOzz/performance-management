import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { createKRA, deleteKRA, editKRA } from "@/services/apis/kra";
import { GET_KRAS } from "@/constants/queryKeys";

export const useCreateKra = (fn?: () => void) => {
    return useMutation({
        mutationFn: createKRA,
        onSuccess: (response) => {
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useEditKra = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editKRA,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_KRAS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useDeleteKra = (fn?: () => void) => {
    return useMutation({
        mutationFn: deleteKRA,
        onSuccess: (response) => {
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};