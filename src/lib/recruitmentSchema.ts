export const recruitmentSchema: any = [
  {
    name: "cv",
    label: "CV",
    type: "file",
    accept: ".pdf,.doc,.docx",
    gridColumn: "half",
    required: true,
  },
  {
    name: "photo",
    label: "Photo",
    type: "file",
    accept: "image/*",
    gridColumn: "half",
    required: false,
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    gridColumn: "half",
    required: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    gridColumn: "half",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    gridColumn: "half",
    required: true,
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    gridColumn: "half",
    required: true,
  },
  {
    name: "university",
    label: "University",
    type: "select",
    options: [
      "KNUST",
      "ASHESI",
      "LEGON",
      "UDS",
      "UCC",
      "UEW",
      "UMAT",
      "UNER",
      "WISCONSIN",
      "UPSA",
      "ACADEMIC CITY",
    ],
    gridColumn: "full",
    required: true,
  },
  {
    name: "firstPriority",
    label: "Job Position-1st Priority",
    type: "select",
    options: ["UI/UX", "FullStack", "Data Analytics", "AI/LLM", "PM"],
    gridColumn: "half",
    required: true,
  },
  {
    name: "secondPriority",
    label: "Job Position-2nd Priority",
    type: "select",
    options: ["UI/UX", "FullStack", "Data Analytics", "AI/LLM", "PM"],
    gridColumn: "half",
    required: true,
  },
  {
    name: "location",
    label: "Location",
    type: "select",
    options: [
      "Greater Accra",
      "Ashanti",
      "Eastern",
      "Western",
      "Nothern",
      "Upper East",
      "Upper West",
      "Volta",
      "Bono",
      "Bono East",
      "Savannah",
    ],
    gridColumn: "full",
    required: true,
  },
];
