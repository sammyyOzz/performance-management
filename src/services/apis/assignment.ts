import { axiosInstance } from "../axiosInstance";
import { ASSIGNMENT_API, ASSIGNMENT_MARK_DONE_API } from "@/constants/api";
import { createQueryString } from "@/utils/createQuery";
import type { CreateAssignmentType, EditAssignmentType, FetchAssignmentsQuery, MarkAssignmentDoneType } from "@/types/assignment";

export const getAssignment = async (id: string) => {
  const res = await axiosInstance.get(`${ASSIGNMENT_API}/${id}`);
  return res.data;
};

export const getAssignments = async (query: FetchAssignmentsQuery) => {
  const res = await axiosInstance.get(`${ASSIGNMENT_API}${createQueryString(query)}`);
  return res.data;
};

export const createAssignment = async (payload: CreateAssignmentType) => {
  const res = await axiosInstance.post(ASSIGNMENT_API, payload);
  return res.data;
};

export const deleteAssignment = async (id: string) => {
  const res = await axiosInstance.delete(`${ASSIGNMENT_API}/${id}`);
  return res.data;
};

export const editAssignment = async (payload: EditAssignmentType) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.put(`${ASSIGNMENT_API}/${id}`, rest);
  return res.data;
};

export const markAssignmentDone = async (payload: MarkAssignmentDoneType) => {
  const { id, ...rest } = payload
  const res = await axiosInstance.patch(`${ASSIGNMENT_MARK_DONE_API}/${id}`, rest);
  return res.data;
};