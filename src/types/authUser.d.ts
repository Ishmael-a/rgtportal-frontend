type Role = "HR" | "MANAGER" | "EMPLOYEE" | "SUPER_ADMIN";


interface User{
    id: string;
    username: string;
    roles:  Role[];
    department_id?: string;
}