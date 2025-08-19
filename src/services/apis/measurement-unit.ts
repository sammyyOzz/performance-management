import { axiosInstance } from "../axiosInstance";
import { MEASUREMENT_UNIT_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const getMeasurementUnit = async (id: string) => {
  const res = await axiosInstance.get(`${MEASUREMENT_UNIT_API}/${id}`);
  return res.data;
};

export const getMeasurementUnits = async (query: any) => {
  const res = await axiosInstance.get(`${MEASUREMENT_UNIT_API}${createQueryString(query)}`);
  return res.data;
};

export const createMeasurementUnit = async (payload: any) => {
  const res = await axiosInstance.post(MEASUREMENT_UNIT_API, payload);
  return res.data;
};

export const deleteMeasurementUnit = async (id: string) => {
  const res = await axiosInstance.delete(`${MEASUREMENT_UNIT_API}/${id}`);
  return res.data;
};

export const editMeasurementUnit = async (payload: any) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${MEASUREMENT_UNIT_API}/${id}`, rest);
  return res.data;
};