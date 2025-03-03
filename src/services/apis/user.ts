import { axiosInstance } from "../axiosInstance";
import { CURRENT_USER_API } from "@/constants/api";

export const getCurrentUser = async () => {
  const res = await axiosInstance.get(CURRENT_USER_API);
  return res.data;
};