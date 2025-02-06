import { LOGIN_API } from "@/constants/api";
import { axiosInstance } from "../axiosInstance";
import type { LoginType } from "@/types/auth";

export const login = async (data: LoginType) => {
  const res = await axiosInstance.post(LOGIN_API, data);
  return res.data;
};