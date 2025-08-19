import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_REVIEW, GET_REVIEWS } from "@/constants/queryKeys";
import { createReview, deleteReview, editReview } from "@/services/apis/review";

export const useCreateReview = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createReview,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_REVIEWS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useEditReview = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: editReview,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_REVIEW] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useDeleteReview = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteReview,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_REVIEWS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};