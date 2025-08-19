export type CreateReviewParams = {
    current_responsibilities: string;
    evaluation_criteria: string;
    excellent_areas: string;
    expectations: string;
    improvement_areas: string;
    user_id: number;
}

export interface FetchReviewsQuery {
  user_id?: string;
  month?: string;
  year?: string;
  page?: string;
  page_size?: string;
}

export interface FetchedReviewType {
    id: number;
    user: any | null;
    user_id: number;
    current_responsibilities: string;
    evaluation_criteria: string;
    excellent_areas: string;
    improvement_areas: string;
    expectations: string;
    created_at: string;
}
  