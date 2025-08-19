import { useMutation, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { GET_SUB_INITIATIVES } from "@/constants/queryKeys";
import { createSubInitiative, deleteSubInitiative, editSubInitiative } from "@/services/apis/sub-initiative";

export const useCreateSubInitiative = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSubInitiative,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_SUB_INITIATIVES] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useEditSubInitiative = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editSubInitiative,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_SUB_INITIATIVES] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useDeleteSubInitiative = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSubInitiative,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_SUB_INITIATIVES] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};