import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/createToast";
import { createKRA } from "@/services/apis/kra";

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