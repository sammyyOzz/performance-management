import type { SingleKraType } from "@/types/kra";
import { axiosInstance } from "../axiosInstance";
import { DEPARTMENT_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getDepartment = async (id: string) => {
  const res = await axiosInstance.get(`${DEPARTMENT_API}/${id}`);
  return res.data;
};

export const getDepartments = async (query: any) => {
  const res = await axiosInstance.get(`${DEPARTMENT_API}${createQueryString(query)}`);
  return res.data;
};

export const createDepartment = async (payload: any) => {
  const res = await axiosInstance.post(DEPARTMENT_API, payload);
  return res.data;
};

export const deleteDepartment = async (id: string) => {
  const res = await axiosInstance.delete(`${DEPARTMENT_API}/${id}`);
  return res.data;
};

export const editDepartment = async (payload: SingleKraType) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${DEPARTMENT_API}/${id}`, rest);
  return res.data;
};