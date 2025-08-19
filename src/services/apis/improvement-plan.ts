import { axiosInstance } from "../axiosInstance";
import { IMPROVEMENT_PLAN_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import { FetchImprovementPlansQuery } from "@/types/improvement-plan";

export const createImprovementPlan = async (payload: any) => {
  const res = await axiosInstance.post(IMPROVEMENT_PLAN_API, payload);
  return res.data;
};

export const getImprovementPlans = async (query: FetchImprovementPlansQuery) => {
  const res = await axiosInstance.get(`${IMPROVEMENT_PLAN_API}${createQueryString(query)}`);
  return res.data;
};

