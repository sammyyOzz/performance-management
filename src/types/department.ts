type Level = "department" | "branch" | "division" | "section"
export interface FetchedDepartmentType {
    id: number;
    name: string;
    level: Level;
    children: [
        {
            id: number;
            name: string;
            level: Level;
            department_head: {
                id: number;
                email: string;
                first_name: string;
                last_name: string;
                staff_id: string;
                is_superUser: boolean;
                roles: null;
            }
        }
    ],
    department_head: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        staff_id: string;
        is_superUser: boolean;
        roles: null;
    }
}