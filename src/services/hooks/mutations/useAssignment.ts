import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_ASSIGNMENT, GET_ASSIGNMENTS } from "@/constants/queryKeys";
import { createAssignment, deleteAssignment, editAssignment, markAssignmentDone } from "@/services/apis/assignment";

export const useCreateAssignment = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAssignment,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useEditAssignment = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editAssignment,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENT] });
            queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useDeleteAssignment = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAssignment,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useMarkAssignmentDone = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: markAssignmentDone,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENT] });
            queryClient.invalidateQueries({ queryKey: [GET_ASSIGNMENTS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};