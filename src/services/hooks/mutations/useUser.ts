import { errorToast, successToast } from "@/utils/createToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "@/services/apis/user";
import { GET_USERS } from "@/constants/queryKeys";
import axios from "axios";

export const useCreateUser = (fn?: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUser,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: [GET_USERS] });
            successToast({ param: null, msg: response?.message })
            fn?.()
        },
        onError: (err: Error) => {
          errorToast({ param: err, variant: "light" })
        },
    });
};

export const useUpdateProfilePicture = () => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/profile-pic`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};