export interface ImprovementPlanAction {
  concernArea: string;
  improvementActions: string;
  resources: string;
}

export interface CreateImprovementPlanParams {
  actions: ImprovementPlanAction[];
  expectedStandards: string;
  improvementArea: string;
  userID: number
};

export interface FetchImprovementPlansQuery {
  user_id?: number;
  month?: number;
  year?: number;
  page?: number;
  page_size?: number;
}

export interface ActionPlan {
  id: number;
  improvement_plan_id?: number;
  concern_area: string;
  improvement_actions: string;
  resources: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface FetchedImprovementPlanType {
  id: number;
  user_id?: number;
  user?: any;
  improvement_area: string;
  expected_standards: string;
  actions: ActionPlan[];
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}