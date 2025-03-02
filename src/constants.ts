/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEventList } from "./components/EventList";
import {
  IAnnouncementCard,
  IProjectType,
  IProjectMembers,
} from "./types/employee";
import { Column } from "./types/tables";

export const avtrDets: Partial<IProjectMembers>[] = [
  {
    name: "Annette Black",
    role: "President Of Americas",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
  },
  {
    name: "Annette Black",
    role: "President Of Americas",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
  },
  {
    name: "Annette Black",
    role: "President Of Americas",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
  },
  {
    name: "Annette Black",
    role: "President Of Americas",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
  },
  {
    name: "Annette Black",
    role: "President Of Americas",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
  },
];

export const postText1 =
  "Lorem ipsum dolor sit amet, #consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie #ipsum et, consequat nibh. Etiam non #elit dui.";

export const postText2 =
  "Which drink do you think is the better summer drink, and why? #quickquestion #plsanswer";

export const imageUrl = {
  url: "https://images.unsplash.com/photo-1517825738774-7de9363ef735?q=80&w=1110&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "A beautiful image",
};
export const poll = [
  {
    pollOption: "Lemonade",
    percentage: 60,
    totalVotes: 6000,
  },
  {
    pollOption: "Ginger",
    percentage: 10,
    totalVotes: 5500,
  },
  {
    pollOption: "Baking Soda",
    percentage: 4,
    totalVotes: 4587,
  },
  {
    pollOption: "Corn Syrup",
    percentage: 1,
    totalVotes: 4587,
  },
  {
    pollOption: "Energy Drink",
    percentage: 25,
    totalVotes: 1418,
  },
];

export const eventList: IEventList[] = [
  {
    event: "holiday",
    date: "Mar 06, 2025",
    title: "Independence Day",
  },
  {
    event: "meeting",
    date: "Apr 25, 2025",
    title: "Group Meetup",
  },
  {
    event: "birthday",
    date: "Jun 25, 2025",
    title: "Fatimah's Birthday",
  },
];

export const announcements: IAnnouncementCard[] = [
  {
    title: "RGT University",
    date: new Date(),
  },
  {
    title: "New Policy Update",
    date: new Date(),
  },
  {
    title: "RGT University",
    date: new Date(),
  },
  {
    title: "New Policy Update",
    date: new Date(),
  },
  {
    title: "RGT University",
    date: new Date(),
  },
  {
    title: "New Policy Update",
    date: new Date(),
  },
];

export const recognees = [
  {
    name: "Bernard Parry",
    project: "Lauder",
  },
  {
    name: "Yusif Ishmael",
    project: "RGT Portal",
  },
  {
    name: "Simon Boateng",
    project: "MediBoard",
  },
  {
    name: "Bernard Parry",
    project: "Lauder",
  },
  {
    name: "Yusif Ishmael",
    project: "RGT Portal",
  },
  {
    name: "Simon Boateng",
    project: "MediBoard",
  },
];

const membersArray = [
  {
    id: 1,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "Design",
    role: "UI/UX",
  },
  {
    id: 2,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "FullStack",
    role: "FE",
  },
  {
    id: 3,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "DevOps",
    role: "AWS",
  },
  {
    id: 4,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "AI",
    role: "LLM",
  },
  {
    id: 5,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "AI",
    role: "Data Analysis",
  },
  {
    id: 6,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "FullStack",
    role: "BE",
  },
  {
    id: 7,
    name: "Enchill Beckham",
    avtr: {
      url: "https://randomuser.me/api/portraits/med/women/75.jpg",
      fallBack: "AB",
    },
    department: "QA",
    role: "QA",
  },
];

// for all project page
export const projectCards: IProjectType[] = [
  {
    id: 0,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 1,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 2,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 3,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 4,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 5,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 6,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
  {
    id: 7,
    name: "Design",
    leadName: "Razak Wasiu",
    members: membersArray,
  },
];

export const timeOffDummy = [
  {
    from: "01 Mar 2023",
    to: "03 Mar 2023",
    total: "3 Days",
    reason: "Engagement",
    status: "Pending",
    type: "Sick Leave",
  },
  {
    from: "01 Mar 2023",
    to: "02 Mar 2023",
    total: "1 Day",
    reason: "Unwell",
    status: "Approved",
    type: "PTO",
  },
  {
    from: "01 Mar 2023",
    to: "04 Mar 2023",
    total: "4 Days",
    reason: "Emergency",
    status: "Rejected",
    type: "PTO",
  },
];

export const timeOffTableColumns: Column[] = [
  { key: "from", header: "From" },
  { key: "to", header: "To" },
  { key: "total", header: "Total" },
  { key: "reason", header: "Reason" },
  {
    key: "status",
    header: "Status",
    cellClassName: (row: Record<string, any>) => {
      const status = row.status; // Access the status value from the row
      return `${
        status === "Pending"
          ? "font-semibold text-[#F9B500] bg-[#FFF7D8] rounded-md w-fit text-left"
          : status === "Approved"
          ? "font-semibold text-[#7ABB9E] bg-[#E5F6EF] rounded-md w-fit"
          : status === "Rejected"
          ? "font-semibold text-[#D92D20] bg-[#FEE4E2] rounded-md "
          : ""
      }`;
    },
  },
  {
    key: "type",
    header: "Type",
    cellClassName: (row: Record<string, any>) => {
      const type = row.type; // Access the type value from the row
      return `${
        type === "Sick Leave"
          ? "font-semibold text-[#7ABB9E]  bg-[#E5F6EF] rounded-md w-fit"
          : type === "PTO"
          ? "font-semibold text-[#F9B500]   bg-[#FFF7D8] rounded-md w-fit"
          : ""
      }`;
    },
  },
];
