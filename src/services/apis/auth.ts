import { axiosInstance } from "../axiosInstance";
import { LOGIN_API, TOKEN_REFRESH_API } from "@/constants/api";
import type { LoginType } from "@/types/auth";

export const login = async (data: LoginType) => {
  const res = await axiosInstance.post(LOGIN_API, data);
  return res.data;
};

export const refreshToken = async (token: string) => {
  const res = await axiosInstance.post(TOKEN_REFRESH_API, { token });
  return res.data
}