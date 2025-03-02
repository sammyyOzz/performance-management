import * as Yup from "yup";

export const createKRAStepOneSchema = Yup.object().shape({
    name: Yup.string().required("Name of objective is required"),
    description: Yup.string().required("Description is required"),
    budget_allocation: Yup.number().required("Budget allocation is required"),
    budget_released: Yup.number().required("Budget released is required"),
    donor_funding: Yup.number().required("Donor funding is required"),
    other_sources: Yup.number().required("Other sources is required"),
});

export const createKRAStepTwoSchema = Yup.object().shape({
    weight: Yup.number().required("Weight is required").min(1, "Weight must be at least 1").max(10, "Weight cannot exceed 10"),
    responsibilities: Yup.array().of(Yup.object().shape({
      department_id: Yup.string().required('Department is required'),
      department_weight: Yup.number()
        .required('Department weight is required')
        .min(0, 'Department weight cannot be negative')
    })).test(
    'weights-sum-equal',
    'Sum of department weights must equal the KRA weight',
    function(responsibilities) {
      const { weight } = this.parent;
      
      // If weight isn't set yet, don't validate this rule
      if (!weight) return true;
      
      // Calculate sum of all department weights
      const departmentWeightsSum = responsibilities?.reduce(
        (sum, item) => sum + (item.department_weight || 0), 
        0
      );
      
      // Allow small floating point differences (0.001 tolerance)
      return Math.abs((departmentWeightsSum as number) - weight) < 0.001;
    }
  )
});

export const editKRASchema = Yup.object().shape({
    name: Yup.string().required("Name of objective is required"),
    description: Yup.string().required("Description is required"),
    budget_allocation: Yup.number().required("Budget allocation is required"),
    budget_released: Yup.number().required("Budget released is required"),
    donor_funding: Yup.number().required("Donor funding is required"),
    other_sources: Yup.number().required("Other sources is required"),
    weight: Yup.number().required("Weight is required").min(1, "Weight must be at least 1").max(10, "Weight cannot exceed 10"),
    responsibilities: Yup.array().of(Yup.object().shape({
      department_id: Yup.string().required('Department is required'),
      department_weight: Yup.number()
        .required('Department weight is required')
        .min(0, 'Department weight cannot be negative')
    })).test(
    'weights-sum-equal',
    'Sum of department weights must equal the KRA weight',
    function(responsibilities) {
      const { weight } = this.parent;
      
      // If weight isn't set yet, don't validate this rule
      if (!weight) return true;
      
      // Calculate sum of all department weights
      const departmentWeightsSum = responsibilities?.reduce(
        (sum, item) => sum + (item.department_weight || 0), 
        0
      );
      
      // Allow small floating point differences (0.001 tolerance)
      return Math.abs((departmentWeightsSum as number) - weight) < 0.001;
    }
  )
});