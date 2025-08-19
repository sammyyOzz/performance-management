import * as Yup from "yup";
import { EmailSchema } from "./auth";

export const createUserFirstStepSchema = Yup.object().shape({
    staffId: Yup.string().required("Employee ID is required"),
    email: EmailSchema,
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required")
});

export const createUserSecondStepSchema = Yup.object().shape({
  department_id: Yup.string().required("Department is required"),
  division_id: Yup.string(),
  branch_id: Yup.string(),
  section_id: Yup.string(),
  position: Yup.string().required("Job title is required"),
  role_id: Yup.string().required("User role is required"),
  supervisor_id: Yup.string().required("Manager is required")
});