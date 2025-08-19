import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_IMPROVEMENT_PLANS } from "@/constants/queryKeys";
import { createImprovementPlan } from "@/services/apis/improvement-plan";

export const useCreateImprovementPlan = (fn?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: createImprovementPlan,
      onSuccess: (response) => {
          queryClient.invalidateQueries({ queryKey: [GET_IMPROVEMENT_PLANS] });
          successToast({ param: null, msg: response?.message })
          fn?.()
      },
      onError: (err: Error) => {
        errorToast({ param: err, variant: "light" })
      },
  });
};