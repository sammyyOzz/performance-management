export interface FetchedAppraiseeTaskType {
  id: number;
  kpi_task: string;
  target_set: string;
  target_achieved: string;
  grade: string;
}

export interface FetchedSubordinateAppraisalType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  has_been_appraised: boolean;
  staff_id: string;
  department_id: number;
  target_achieved: string;
  current_responsibilities: string;
  evaluate: string;
  areas_of_excellence: string;
  areas_of_improvement: string;
  expectations: string;
  appraisee_comment: string;
  grade_level: string;
  supervisor_id: null | number;
  status: "active" | "pending";
  email_verified: boolean;
  is_superuser: boolean;
  role_id: number;
  onboarding_level: number;
}

export interface CreateAppraisalParams {
  assignment_ids: number[];
  comments: string;
  appraiser_id: number;
  appraisee_id: number;
  counter_signing_officer_id: number;
  communication_skills: string;
  communication_skills_score: number;
  transparency: string;
  transparency_score: number;
  knowledge: string;
  knowledge_score: number;
  development: string;
  development_score: number;
  integrity: string;
  integrity_score: number;
  commitment: string;
  commitment_score: number;
  innovation_comment: string;
  innovation_score: number;
  turn_around_comment: string;
  turn_around_score: number;
  punctuality_comment: string;
  punctuality_score: number;
}

export interface FetchAppraisalsQuery {
  user_id: string;
  quarter: string;
  year: string;
}

export interface FetchedAppraisalType {
  0: {
    id: number;
    assignments: Assignment[];
    review_date: string;
    rating: number;
    comments: string;
    status: string;
    appraiser_id: number;
    appraiser: User;
    appraisee_id: number;
    appraisee: User;
    counter_signing_officer_id: number;
    counter_signing_officer: User;
    created_at: string;
    updated_at: string;
    deleted_at: null | string;
    communication_skills: string;
    communication_skills_score: number;
    transparency: string;
    transparency_score: number;
    knowledge: string;
    knowledge_score: number;
    development: string;
    development_score: number;
    integrity: string;
    integrity_score: number;
    commitment: string;
    commitment_score: number;
    innovation_comment: string;
    innovation_score: number;
    turn_around_comment: string;
    turn_around_score: number;
    punctuality_comment: string;
    punctuality_score: number;
  }
}

interface Assignment {
  ID: number;
  SubInitiativeID: number;
  SubInitiative: null | any;
  Achieved: string;
  User: null | any;
  UserID: number;
  Department: null | any;
  DepartmentID: null | number;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  Quarter: number;
}

interface User {
  id: number;
  staff_id: string;
  first_name: string;
  last_name: string;
  email: string;
  department_id: number;
  division_id: number;
  branch_id: number;
  section_id: number;
  position: string;
  level: string;
  supervisor_id: number | null;
  status: string;
  email_verified: boolean;
  is_superuser: boolean;
  is_supervisor: boolean;
  marital_status: string;
  work_phone: string;
  role_id: number;
  onboarding_level: number;
  created_at: string;
}

export enum QuarterEnum {
  Q1 = "1",
  Q2 = "2",
  Q3 = "3",
  Q4 = "4",
}