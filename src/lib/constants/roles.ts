import {RolesWithPermissions} from "../../types/permissions"


export const ROLES: RolesWithPermissions = {
    EMPLOYEE: {
      ptoRequests: {
        create: true,
        view: (user, request) => request?.employee_id === user.id
      }
    },
    MANAGER: {
      ptoRequests: {
        approve: (user, request) => request?.department_id === user.department_id
      }
    },
    HR: {
      employeeRecords: {
        view: true,
        edit: true
      }
    },
    SUPER_ADMIN: {
      $all: true
    }
  } as const;
  