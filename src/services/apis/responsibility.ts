import { axiosInstance } from "../axiosInstance";
import { RESPONSIBILITY_API } from "@/constants/api";

export const deleteResponsibility = async (id: string) => {
  const res = await axiosInstance.delete(`${RESPONSIBILITY_API}/${id}`);
  return res.data;
};