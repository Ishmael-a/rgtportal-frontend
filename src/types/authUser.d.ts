/* eslint-disable @typescript-eslint/no-explicit-any */
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
  employee: any | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

interface ResponseUser {
  id: number;
  email: string;
  username: string;
  profileImage: string;
  employee: any | null;
  role: ResponseRole;
  createdAt: string;
  updatedAt: string;
}
