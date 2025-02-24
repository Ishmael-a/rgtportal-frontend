export type PermissionResource = {
    ptoRequests: "create" | "view" | "approve";
    employeeRecords: "view" | "edit" | "delete";
    events: "create" | "edit" | "rsvp";
  };
  
// export type PermissionMap = {
//     [K in keyof PermissionResource]: {
//         resource: K;
//         action: PermissionResource[K];
//     };
// }[keyof PermissionResource];


type PTORequest = {
    employee_id: string;
    department_id: string;
    // other fields...
};

type Employee = {
    id: string;
    // other fields...
};

type Event = {
    id: string;
    // other fields...
};

export type Permissions = {
    ptoRequests: {
      dataType: PTORequest  // From your ERD
      action: "create" | "view" | "approve"
    },
    employeeRecords: {
      dataType: Employee    // From ERD
      action: "view" | "edit" | "delete"
    },
    events: {
      dataType: Event       // From ERD
      action: "create" | "edit" | "rsvp"
    }
 }

export type PermissionCheck<T> = (user: User, data?: T) => boolean;

export type RolesWithPermissions = {
    [R in Role]: {
      [K in keyof Permissions]?: {
        [A in Permissions[K]["action"]]?: 
          boolean | PermissionCheck<Permissions[K]["dataType"]>
      }
    } & {
      // Allow special $all property
      $all?: boolean
    }
};




  
  
