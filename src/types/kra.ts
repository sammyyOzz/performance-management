export type CreateKRAParams = {
    budget_allocation: string;
    budget_released: string;
    description: string;
    donor_funding: string;
    name: string;
    other_sources: string;
    responsibilities: {
        department_id: number;
        department_weight: number;
    }[];
    weight: number;
}

export interface SingleKraType {
    id: number;
    name: string;
    description: string;
    weight: number;
    budget_allocation: number;
    budget_released: number;
    donor_funding: number;
    other_sources: number;
    responsibilities: {
        department_id: number;
        department_weight: number;
        department_name: string;
    }[]
}

export interface FetchedKRAType {
    data: SingleKraType[];
    message: string;
    page: number;
    page_size: number;
    total_budget_allocation: number;
    total_budget_released: number;
    total_donor_funding: number;
    total_items: number;
    total_other_sources: number;
    total_weight: number;
}

export interface FetchKRAsQuery {
    filter?: string;
    page?: string;
    page_size?: string;
}