import * as Yup from "yup";

export const createDepartmentSchema = Yup.object().shape({
    name: Yup.string().required("Name of department is required"),
    level: Yup.string().required("Level is required"),
    children: Yup.array().of(Yup.object().shape({
        name: Yup.string().required("Name of child is required"),
        level: Yup.string().required("Level is required")
    })),
});