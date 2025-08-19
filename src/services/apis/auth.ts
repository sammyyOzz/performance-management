import { axiosInstance } from "../axiosInstance";
import { LOGIN_API, PASSWORD_CHANGE_API, SET_USER_PASSWORD_API, TOKEN_REFRESH_API, FORGOT_PASSWORD_API } from "@/constants/api";
import type { LoginType, PasswordChangeType, SetUserPasswordType } from "@/types/auth";

export const login = async (data: LoginType) => {
  const res = await axiosInstance.post(LOGIN_API, data);
  return res.data;
};

export const refreshToken = async (token: string) => {
  const res = await axiosInstance.post(TOKEN_REFRESH_API, { token });
  return res.data
}

export const passwordChange = async (data: PasswordChangeType) => {
  const res = await axiosInstance.post(PASSWORD_CHANGE_API, data);
  return res.data
}

export const setUserPassword = async (data: SetUserPasswordType) => {
  const res = await axiosInstance.post(SET_USER_PASSWORD_API, data);
  return res.data
}

export const forgotPassword = async (data: { email: string }) => {
  const res = await axiosInstance.post(FORGOT_PASSWORD_API, data);
  return res.data
}