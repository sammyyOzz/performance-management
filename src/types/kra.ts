export type CreateKRAParams = {
    budget_allocation: string;
    budget_released: string;
    description: string;
    donor_funding: number;
    name: string;
    other_sources: number;
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
        id: number;
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
    id?: string;
    department_id?: string;
    user_id?: string;
    title?: string;
    status?: string;
    description?: string;
    page?: string;
    page_size?: string;
    parentID?: string;
    year?: string;
    search?: string;
    level?: "department" | "division" | "branch" | "section";
    filter?: string;
}