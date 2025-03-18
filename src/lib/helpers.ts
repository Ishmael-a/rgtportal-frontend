import { Employee } from "@/types/employee";

export const getAvatarFallback = (employee: Employee) => {
  return `${employee.firstName?.slice(0, 1).toUpperCase()}${employee.lastName
    ?.slice(0, 1)
    .toUpperCase()}`;
};
