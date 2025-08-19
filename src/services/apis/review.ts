import { axiosInstance } from "../axiosInstance";
import { REVIEW_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { CreateReviewParams } from "@/types/review";

export const getReview = async (id: string) => {
  const res = await axiosInstance.get(`${REVIEW_API}/${id}`);
  return res.data;
};

export const getReviews = async (query: any) => {
  const res = await axiosInstance.get(`${REVIEW_API}${createQueryString(query)}`);
  return res.data;
};

export const createReview = async (payload: CreateReviewParams) => {
  const res = await axiosInstance.post(REVIEW_API, payload);
  return res.data;
};

export const deleteReview = async (id: string) => {
  const res = await axiosInstance.delete(`${REVIEW_API}/${id}`);
  return res.data;
};

export const editReview = async (payload: CreateReviewParams & { id: string | number; }) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${REVIEW_API}/${id}`, rest);
  return res.data;
};