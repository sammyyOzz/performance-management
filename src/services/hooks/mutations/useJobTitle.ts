import { GET_JOB_TITLE, GET_JOB_TITLES } from "@/constants/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobTitle, deleteJobTitle, editJobTitle } from "@/services/apis/job-title";
import { errorToast, successToast } from "@/utils/createToast";
import { CreateUserParams } from "@/types/user";

/**
 * Hook to create a new job title
 */
export const useCreateJobTitle = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateUserParams) => createJobTitle(payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_JOB_TITLES] });
            queryClient.invalidateQueries({ queryKey: [GET_JOB_TITLE] });
            successToast({ param: null, msg: response?.message || "Job title created successfully" });
            fn?.();
        },
        onError: (err: Error) => {
            errorToast({ param: err, variant: "light" });
        },
    });
};

/**
 * Hook to edit an existing job title
 */
export const useEditJobTitle = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateUserParams & { id: string | number }) => editJobTitle(payload),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_JOB_TITLES] });
            queryClient.invalidateQueries({ queryKey: [GET_JOB_TITLE] });
            successToast({ param: null, msg: response?.message || "Job title updated successfully" });
            fn?.();
        },
        onError: (err: Error) => {
            errorToast({ param: err, variant: "light" });
        },
    });
};

/**
 * Hook to delete a job title
 */
export const useDeleteJobTitle = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteJobTitle(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_JOB_TITLES] });
            queryClient.invalidateQueries({ queryKey: [GET_JOB_TITLE] });
            successToast({ param: null, msg: response?.message || "Job title deleted successfully" });
            fn?.();
        },
        onError: (err: Error) => {
            errorToast({ param: err, variant: "light" });
        },
    });
}; 