import { CreateAppraisalParams, FetchAppraisalsQuery } from "@/types/appraisal";
import { axiosInstance } from "../axiosInstance";
import { APPRAISAL_API, GET_APPRAISALS_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";

export const createAppraisal = async (payload: CreateAppraisalParams) => {
  const res = await axiosInstance.post(APPRAISAL_API, payload);
  return res.data;
};

export const getAppraisals = async (query: FetchAppraisalsQuery) => {
  const res = await axiosInstance.get(`${GET_APPRAISALS_API}/${query.user_id}${createQueryString(query)}`);
  return res.data;
}