import { axiosInstance } from "../axiosInstance";
import { SUB_INITIATIVE_API } from "@/constants/api";
import { EditSubInitiativeParams } from "@/types/sub-initiative";
import { createQueryString } from "@/utils/createQuery";

export const getSubInitiative = async (id: string) => {
  const res = await axiosInstance.get(`${SUB_INITIATIVE_API}/${id}`);
  return res.data;
};

export const getSubInitiatives = async (query: any) => {
  const res = await axiosInstance.get(`${SUB_INITIATIVE_API}${createQueryString(query)}`);
  return res.data;
};

export const createSubInitiative = async (payload: any) => {
  const res = await axiosInstance.post(SUB_INITIATIVE_API, payload);
  return res.data;
};

export const deleteSubInitiative = async (id: string) => {
  const res = await axiosInstance.delete(`${SUB_INITIATIVE_API}/${id}`);
  return res.data;
};

export const editSubInitiative = async (payload: EditSubInitiativeParams) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${SUB_INITIATIVE_API}/${id}`, rest);
  return res.data;
};