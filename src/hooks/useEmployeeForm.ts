import { useState, useEffect } from "react";
import { GetCountries, GetState } from "react-country-state-city";
import { Country, State } from "react-country-state-city/dist/esm/types";
import { WORK_TYPES, EMPLOYEE_TYPES } from "@/constants";
import { Employee } from "@/types/employee";

export const useEmployeeForm = (employee: Employee) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);


  // Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fetchedCountries = await GetCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch States when country changes
  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          const fetchedStates = await GetState(selectedCountry);
          setStates(fetchedStates);
        } catch (error) {
          console.error("Failed to fetch states", error);
          setStates([]);
        }
      }
    };
    fetchStates();
  }, [selectedCountry]);

    // Initial form values
    const initialValues = {
      department: {
        id: employee?.department?.id || 0,
        name: employee?.department?.name || "",
      },
      personalEmail: employee?.contactDetails?.personalEmail || "",
      phone: employee?.phone || "",
      employeeType: employee?.employeeType || EMPLOYEE_TYPES.FULL_TIME,
      workType: employee?.workType || WORK_TYPES.HYBRID,
      hireDate: employee?.hireDate || null,
      endDate: employee?.endDate || null,
      leaveType: employee?.leaveType || "",
      leaveExplanation: employee?.leaveExplanation || "",
      notes: employee?.notes || "",
      homeAddress: employee?.contactDetails?.homeAddress || "",
      city: employee?.contactDetails?.city || "",
      stateId: employee?.contactDetails?.region || "",
      countryId: employee?.contactDetails?.country
        ? Number(employee.contactDetails.country)
        : null,
      birthDate: employee?.birthDate || null,
    };

  return {
    countries,
    states,
    initialValues,
    setSelectedCountry,
  };
};
