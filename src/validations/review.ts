import * as yup from "yup";

export const createReviewSchema = yup.object().shape({
  current_responsibilities: yup
    .string()
    .trim()
    .min(10, "Please provide more details about your current responsibilities.")
    .required("Current responsibilities are required."),
  evaluation_criteria: yup
    .string()
    .trim()
    .min(5, "Evaluation criteria must be at least 5 characters long.")
    .required("Evaluation criteria are required."),
  excellent_areas: yup
    .string()
    .trim()
    .min(5, "Mention at least one area where the person excelled.")
    .required("Excellent areas are required."),
  expectations: yup
    .string()
    .trim()
    .min(5, "Expectations should be at least 5 characters long.")
    .required("Expectations are required."),
  improvement_areas: yup
    .string()
    .trim()
    .min(5, "Mention at least one area of improvement.")
    .required("Improvement areas are required."),
});
