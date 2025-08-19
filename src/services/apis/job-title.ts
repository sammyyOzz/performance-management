import { axiosInstance } from "../axiosInstance";
import type { CreateUserParams, FetchUsersQuery } from "@/types/user";
import { JOB_TITLE_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import { FetchJobTitlesQuery } from "@/types/job-title";

export const getJobTitles = async (query?: FetchJobTitlesQuery) => {
  const queryString = query ? createQueryString(query) : '';
  const res = await axiosInstance.get(`${JOB_TITLE_API}${queryString}`);
  return res.data;
};

export const createJobTitle = async (payload: CreateUserParams) => {
  const res = await axiosInstance.post(JOB_TITLE_API, payload);
  return res.data;
};

export const getJobTitle = async (query: FetchUsersQuery) => {
  const res = await axiosInstance.get(`${JOB_TITLE_API}${createQueryString(query)}`);
  return res.data;
}

export const editJobTitle = async (payload: CreateUserParams & { id: string | number; }) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${JOB_TITLE_API}/${id}`, rest);
  return res.data;
};

export const deleteJobTitle = async (id: string) => {
  const res = await axiosInstance.delete(`${JOB_TITLE_API}/${id}`);
  return res.data;
};