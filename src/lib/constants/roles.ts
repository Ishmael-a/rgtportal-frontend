import {RolesWithPermissions} from "@/types/permissions"


export const ROLES: RolesWithPermissions = {
  HR: {
    employeeRecords: {
      view: true,
      edit: true,
      delete: true
    }
  },
  MANAGER: {
    ptoRequests: {
      approve: (user: User, request?: PTORequest) => request?.department_id === user.employee?.department_id
    },
    employeeRecords: {
      view: true
    }
  },
  EMPLOYEE: {
    ptoRequests: {
      create: true,
      view: (user: User, request?: PTORequest) => request?.employee_id === user.id.toString()
    },
    employeeRecords: {
      view: true
    }
  },
  ADMIN: {
    $all: true  // Full access to everything
  },
  MODERATOR: {
    // Specific permissions for moderators
    employeeRecords: {
      view: true
    }
  }
} as const;

  