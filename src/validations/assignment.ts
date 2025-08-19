import * as Yup from "yup";

export const createEmployeeTaskSchema = Yup.object().shape({
  sub_initiative_id: Yup.string().required("Select a sub initiative"),
});

export const editAssignmentSchema = Yup.object().shape({
  achieved: Yup.string().required("Please enter a score"),
  status: Yup.string().required("Please select a status"),
});

//
export type CriteriaMode = "number" | "date";

export const getCreateEmployeeTaskSchema = (mode: CriteriaMode) => {
  const fieldSchema =
    mode === "number"
      ? Yup.number()
          .typeError("Must be a number")
          .required("This field is required")
      : Yup.date()
          .typeError("Must be a valid date")
          .required("This field is required");

  return Yup.object().shape({
    sub_initiative_id: Yup.string().required("Select a sub initiative"),
    expected_delivery_date: Yup.date()
      .typeError("Must be a valid date")
      .required("This field is required"),
    weight: Yup.number()
      .typeError("Must be a valid number")
      .required("This field is required"),
    excellent_max: fieldSchema,
    excellent_min: fieldSchema,
    fair_max: fieldSchema,
    fair_min: fieldSchema,
    good_max: fieldSchema,
    good_min: fieldSchema,
    outstanding_max: fieldSchema,
    outstanding_min: fieldSchema,
    pass_max: fieldSchema,
    pass_min: fieldSchema,
    very_good_max: fieldSchema,
    very_good_min: fieldSchema,
  });
};

export const getMarkAssignmentDoneSchema = (mode: CriteriaMode) => {
  const fieldSchema =
    mode === "number"
      ? Yup.number()
          .typeError("Must be a number")
          .required("This field is required")
      : Yup.date()
          .typeError("Must be a valid date")
          .required("This field is required");

  return Yup.object().shape({
    achieved: fieldSchema,
  });
};
