import { axiosInstance } from "../axiosInstance";
import type { CreateUserParams, FetchExistingUsersQuery, FetchUsersQuery } from "@/types/user";
import { CURRENT_USER_API, CREATE_USER_API, GET_USERS_API, GET_EXISTING_USERS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getCurrentUser = async () => {
  const res = await axiosInstance.get(CURRENT_USER_API);
  return res.data;
};

export const createUser = async (payload: CreateUserParams) => {
  const res = await axiosInstance.post(CREATE_USER_API, payload);
  return res.data;
};

export const getUsers = async (query: FetchUsersQuery) => {
  const res = await axiosInstance.get(`${GET_USERS_API}${createQueryString(query)}`);
  return res.data;
}

export const getUser = async (id: string) => {
  const res = await axiosInstance.get(`${GET_USERS_API}/${id}`);
  return res.data;
}

export const getExistingUsers = async (query: FetchExistingUsersQuery) => {
  const res = await axiosInstance.get(`${GET_EXISTING_USERS_API}${createQueryString(query)}`);
  return res.data;
}