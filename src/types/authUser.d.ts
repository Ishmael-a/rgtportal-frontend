type ROLE = "HR" | "MANAGER" | "EMPLOYEE" | "ADMIN" | "MODERATOR";
type lROLE = "hr" | "manager" | "employee" | "admin" | "moderator";


interface Role {
    id: number;
    name: ROLE;
    description: string;
}

interface ResponseUserRole {
    id: number;
    name: lRole;
    description: string;
}
  
interface User {
    id: number;
    email: string;
    username: string;
    profileImage: string;
    employee: any | null; // Adjust type if employee has a specific structure
    role: Role;
    createdAt: string; // Use Date if you plan to parse it
    updatedAt: string;
}


interface ResponseUser {
    id: number;
    email: string;
    username: string;
    profileImage: string;
    employee: any | null; // Adjust type if employee has a specific structure
    role: ResponseRole;
    createdAt: string; // Use Date if you plan to parse it
    updatedAt: string;
  }