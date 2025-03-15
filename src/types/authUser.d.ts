/* eslint-disable @typescript-eslint/no-explicit-any */
type ROLE = "HR" | "MANAGER" | "EMPLOYEE" | "ADMIN" | "MODERATOR";
type lROLE = "hr" | "manager" | "employee" | "admin" | "moderator";

export enum RoleType {
  HR = "hr",
  EMPLOYEE = "emp",
  MANAGER = "manager", 
  ADMIN = "admin",
}

interface Role {
  id: number;
  name: ROLE;
  description: string;
}

interface ResponseUserRole {
  name: lRole;
  id: number;
  description: string;
}

export interface User {
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
