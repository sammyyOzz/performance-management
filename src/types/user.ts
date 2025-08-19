export type CreateUserParams = {
  department_id: number;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
  role_id: number;
  staffId: string;
  supervisor_id: number;
  division_id: number;
  branch_id: number;
  section_id: number;
};

export interface FetchUsersQuery {
  filter?: string;
  page?: string;
  page_size?: string;
  supervisor_id?: string;
  search?: string;
}

interface Department {
  id: number;
  name: string;
}

interface Supervisor {
  id: number;
  staff_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  department_id: number;
  department: Department | null;
  division_id: number | null;
  branch_id: number | null;
  section_id: number | null;
  position: string;
  grade_level: string;
  supervisor_id: number | null;
  supervisor: Supervisor | null;
  status: string;
  email_verified: boolean;
  is_superuser: boolean;
  role_id: number;
  onboarding_level: number;
  department_name: string;
  is_supervisor: boolean;
  role: string;
}

export interface FetchedUserType {
  id: number;
  staff_id: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  department_id: number;
  department: Department;
  division_id: number | null;
  branch_id: number | null;
  section_id: number | null;
  position: string;
  grade_level: string;
  supervisor_id: number;
  supervisor: Supervisor;
  status: string;
  email_verified: boolean;
  is_superuser: boolean;
  role_id: number;
  onboarding_level: number;
  department_name: string;
  is_supervisor: boolean;
  role: string;
}

// export interface FetchedUserType {
//     id: number;
//     staff_id: string;
//     first_name: string;
//     last_name: string;
//     email: string;
//     department_id: number;
//     division_id: number;
//     branch_id: number;
//     section_id: number;
//     department_name: string;
//     position: string;
//     grade_level: string;
//     supervisor_id: null | number;
//     status: "active" | "pending";
//     email_verified: boolean;
//     is_superuser: boolean;
//     role_id: number;
//     onboarding_level: number;
// }

export interface FetchExistingUsersQuery {
  // filter?: string;
  page?: string;
  page_size?: string;
  staff_id?: string;
}

export interface FetchedExistingUserType {
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
  grade_level: string;
  supervisor_id: number | null;
  status: string;
  email_verified: boolean;
  is_superuser: boolean;
  role_id: number;
  onboarding_level: number;
  department_name: string;
  is_supervisor: boolean;
}

export interface FetchExistingUsersResponse {
  data: FetchedExistingUserType[];
  message: string;
  page: number;
  page_size: number;
  total: number;
}
