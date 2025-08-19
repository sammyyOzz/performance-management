import * as Yup from "yup";

const MAX_TOTAL_SCORE = 30; // Sum of all max scores: 2 + 2 + 4 + 4 + 4 + 4 + 4 + 3 + 3 = 30

export const CreateAppraisalSchema = Yup.object().shape({
  communication_skills: Yup.string().required("Communication skills comment is required"),
  communication_skills_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(2, "Maximum score is 2")
    .required("Communication skills score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  transparency: Yup.string().required("Transparency comment is required"),
  transparency_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(2, "Maximum score is 2")
    .required("Transparency score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  knowledge: Yup.string().required("Knowledge comment is required"),
  knowledge_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(4, "Maximum score is 4")
    .required("Knowledge score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  development: Yup.string().required("Development comment is required"),
  development_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(4, "Maximum score is 4")
    .required("Development score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  integrity: Yup.string().required("Integrity comment is required"),
  integrity_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(4, "Maximum score is 4")
    .required("Integrity score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  commitment: Yup.string().required("Commitment comment is required"),
  commitment_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(4, "Maximum score is 4")
    .required("Commitment score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  innovation_comment: Yup.string().required("Innovation comment is required"),
  innovation_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(4, "Maximum score is 4")
    .required("Innovation score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  turn_around_comment: Yup.string().required("Turn around comment is required"),
  turn_around_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(3, "Maximum score is 3")
    .required("Turn around score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  punctuality_comment: Yup.string().required("Punctuality comment is required"),
  punctuality_score: Yup
    .number()
    .min(0, "Minimum score is 0")
    .max(3, "Maximum score is 3")
    .required("Punctuality score is required")
    .test('is-decimal', 'Score must be a whole number', val => Number.isInteger(val)),
  comments: Yup.string().required("Overall comment is required"),
}).test('total-score', 'Total score cannot exceed ' + MAX_TOTAL_SCORE, function(value) {
  const totalScore = 
    (value.communication_skills_score || 0) +
    (value.transparency_score || 0) +
    (value.knowledge_score || 0) +
    (value.development_score || 0) +
    (value.integrity_score || 0) +
    (value.commitment_score || 0) +
    (value.innovation_score || 0) +
    (value.turn_around_score || 0) +
    (value.punctuality_score || 0);
  
  return totalScore <= MAX_TOTAL_SCORE;
});

// appraisee_id: Yup.number().required("Appraisee is required"),
  // appraiser_id: Yup.number().required("Appraiser is required"),
  // counter_signing_officer_id: Yup.number().required("Counter signing officer is required"),
  // assignment_ids: Yup
  //   .array()
  //   .of(Yup.number())
  //   .min(1, "At least one assignment must be selected")
  //   .required("Assignments are required"),