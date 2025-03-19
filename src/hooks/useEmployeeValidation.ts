import * as Yup from "yup";
import {
  EMPLOYEE_TYPES,
  LEAVE_TYPES,
  ROLE_TYPES,
} from "@/constants";

export const useEmployeeValidation = () => {
  const validationSchema = Yup.object().shape({
    department: Yup.object().shape({
      id: Yup.number(),
    }),
    personalEmail: Yup.string().email("Invalid email address"),
    phone: Yup.string(),
    employeeType: Yup.string().oneOf(Object.values(EMPLOYEE_TYPES)),
    skills: Yup.array().of(Yup.string()),
    roleId: Yup.string().oneOf(Object.values(ROLE_TYPES)),
    hireDate: Yup.date().nullable(),
    endDate: Yup.date().nullable(),
    leaveType: Yup.string().oneOf(Object.values(LEAVE_TYPES)).nullable(),
    leaveExplanation: Yup.string().when("leaveType", {
      is: (val: string) => val && val !== "",
      then: (schema) =>
        schema.required(
          "Explanation is required when leave reason is provided"
        ),
      otherwise: (schema) => schema.nullable(),
    }),
    notes: Yup.string().nullable(),
    homeAddress: Yup.string().nullable(),
    countryId: Yup.number().nullable(),
    stateId: Yup.string().nullable(),
    city: Yup.string().nullable(),
    birthDate: Yup.date().nullable(),
  });

  return { validationSchema };
};
