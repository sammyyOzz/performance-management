export interface FetchedSubInitiative {
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
    responsibilities: {
        id: number;
        department_id: number;
        department_weight: number;
        department_name: string;
        level: "division" | "section" | "branch" | "department";
        parent_id: number;
    }[]
}

export interface FetchedSingleSubInitiative {
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
    responsibilities: {
        id: number;
        department_id: number;
        department_weight: number;
        department_name: string;
        level: "division" | "section" | "branch" | "department"
        parent_id: number;

    }[]
}

export type EditSubInitiativeParams = {
    id: string;
    assigned_weight: number;
    graded_weight: number;
    kpi: string;
    kra_id: number;
    name: string;
    responsibilities: {
        department_id: number;
        department_weight: number;
    }[]
    target: string;
    unit_of_measurement_id: number;
}