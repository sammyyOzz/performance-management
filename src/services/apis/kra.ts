import type { CreateKRAParams, FetchKRAsQuery, SingleKraType } from "@/types/kra";
import { axiosInstance } from "../axiosInstance";
import { KRA_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getKRA = async (id: string) => {
  const res = await axiosInstance.get(`${KRA_API}/${id}`);
  return res.data;
};

export const getKRAs = async (query: FetchKRAsQuery) => {
  const res = await axiosInstance.get(`${KRA_API}${createQueryString(query)}`);
  return res.data;
};

export const createKRA = async (payload: CreateKRAParams) => {
  const res = await axiosInstance.post(KRA_API, payload);
  return res.data;
};

export const deleteKRA = async (id: string) => {
  const res = await axiosInstance.delete(`${KRA_API}/${id}`);
  return res.data;
};

export const editKRA = async (payload: SingleKraType) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${KRA_API}/${id}`, rest);
  return res.data;
};