<<<<<<< HEAD
import { User } from "@/types/authUser";
import { RolesWithPermissions } from "@/types/permissions";
=======
import {RolesWithPermissions} from "@/types/permissions"
import {User} from "@/types/authUser";
import {PTORequest} from "@/types/PTOS"
>>>>>>> e1b7f54793849ffbdf8ce04d97dac3ad696c4616

export const ROLES: RolesWithPermissions = {
  HR: {
    employeeRecords: {
      view: true,
      edit: true,
      delete: true,
    },
  },
  MANAGER: {
    ptoRequests: {
<<<<<<< HEAD
      approve: (user: User, request?: PTORequest) =>
        request?.department_id === user.employee?.department_id,
=======
      approve: (user: User, request?: PTORequest) => request?.department_id === user.employee?.departmentId?.toString()
>>>>>>> e1b7f54793849ffbdf8ce04d97dac3ad696c4616
    },
    employeeRecords: {
      view: true,
    },
  },
  EMPLOYEE: {
    ptoRequests: {
      create: true,
      view: (user: User, request?: PTORequest) =>
        request?.employee_id === user.id.toString(),
    },
    employeeRecords: {
      view: true,
    },
  },
  ADMIN: {
    $all: true, // Full access to everything
  },
  MODERATOR: {
    // Specific permissions for moderators
    employeeRecords: {
      view: true,
    },
  },
} as const;
