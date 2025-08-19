import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_DEPARTMENT, GET_DEPARTMENTS } from "@/constants/queryKeys";
import { createDepartment, deleteDepartment, editDepartment } from "@/services/apis/department";

export const useCreateDepartment = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createDepartment,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENTS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useEditDepartment = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editDepartment,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENT] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useDeleteDepartment = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteDepartment,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_DEPARTMENTS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};