export type FetchAssignmentsQuery = {
    user_id?: number;
    department_id?: number;
    status?: string;
    search?: string;
    page?: number;
    page_size?: number;
}

export interface CreateCriteria {
    excellent_max: string;
    excellent_min: string;
    fair_max: string;
    fair_min: string;
    good_max: string;
    good_min: string;
    outstanding_max: string;
    outstanding_min: string;
    pass_max: string;
    pass_min: string;
    very_good_max: string;
    very_good_min: string;
}

export type CreateAssignmentType = {
    department_id?: number;
    sub_initiative_id: number;
    user_id: number;
    expected_delivery_date: string;
    create_criteria: CreateCriteria;
    weight: number;
    graded_weight: number;
}

export type EditAssignmentType = {
    achieved: string;
    status: string;
    id: number;
    sub_initiative_id: number;
    user_id: number;
}

export interface FetchedAssignmentType {
    id: number;
    sub_initiative_id: number;
    sub_initiative: {
        id: number;
        kra_id: number;
        name: string;
        graded_weight: number;
        assigned_weight: number;
        target: string;
        kpi: string;
        unit_of_measurement_id: number;
        unit_of_measurement: {
            name: string;
        }
    },
    user: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        staff_id: string;
        is_superUser: boolean;
        roles: null
    };
    user_id: number | null,
    department: {
        id: number;
        name: string;
        level: "department" | "division" | "branch" | "section";
        parent_id: null | number;
        children: null | number;
        department_head: null | number;
    },
    department_id: number;
    created_at: Date | string;
    achieved: string;
    status: string;
    grade: string;
    grade_value: string;
    score: number;
    expected_delivery_date: string;
    criteria: CreateCriteria;
    graded_weight: number;
    weight: number;
    weighted_score: number;
}

export type MarkAssignmentDoneType = {
    id: number;
    achieved: string;
}