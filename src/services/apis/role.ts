import { axiosInstance } from "../axiosInstance";
import { ROLES_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getRoles = async (query: any) => {
  const res = await axiosInstance.get(`${ROLES_API}${createQueryString(query)}`);
  return res.data;
}