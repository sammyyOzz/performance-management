import * as Yup from "yup";

export const ImprovementPlanSchema = Yup.object().shape({
    improvementArea: Yup.string().required("Please specify areas for improvement"),
    expectedStandards: Yup.string().required("Expected standards are required"),
    actions: Yup.array().of(
        Yup.object().shape({
            concernArea: Yup.string().required("Area of concern is required"),
            improvementActions: Yup.string().required("Improvement actions are required"),
            resources: Yup.string().required("Support/Resources are required")
        })
    ).min(1, "At least one improvement plan is required")
});