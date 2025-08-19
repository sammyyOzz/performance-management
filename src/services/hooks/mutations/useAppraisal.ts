import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_APPRAISALS } from "@/constants/queryKeys";
import { createAppraisal } from "@/services/apis/appraisal";

export const useCreateAppraisal = (fn?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAppraisal,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_APPRAISALS] });
      successToast({ param: null, msg: response?.message });
      fn?.();
    },
    onError: (err: Error) => {
      errorToast({ param: err, variant: "light" });
    },
  });
};
