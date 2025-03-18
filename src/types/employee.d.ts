/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ClassNameValue } from "tailwind-merge";
import { Poll } from "./polls";
interface IDepartmentCard {
  id: string | number;
  employees: Employee[];
  name: string;
  leadName?: string;
  includeBgImg?: boolean;
}

// interface IDepartmentMembers {
//   id: number;
//   name: string;
//   avtr: { url: string; fallBack: string };
//   department: string;
//   role: string;
// }

interface IFeed {
  poll?: Poll;
  post?: IPost;
  postId?: number;
}

interface IAnnouncementCard {
  title: string;
  date: Date;
}

interface IAvtrComponent {
  className?: ClassNameValue;
  index?: number;
  url: string;
  name: string;
}

interface EmployeeCardType {
  id: string;
  name: string;
  position: string;
  phone: string;
  email: string;
  imgSrc: string;
}

export type EmployeeType = "full_time" | "part_time" | "contractor" | "nsp";

type WorkType = "hybrid" | "remote";

export interface Employee {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  birthDate?: Date | null;
  skills?: string[] | null;
  photoUrl?: string | null;
  role?: string | null;
  employeeType?: EmployeeType | null;
  workType?: WorkType | null;
  position: string | null;
  agency?: string | null;
  hireDate: Date | null;
  endDate?: Date | null;
  sickDaysBalance: number;
  annualDaysOff: number;
  vacationDaysBalance: number;
  leaveType?: string | null;
  leaveExplanation?: string | null;
  contactDetails: Record<string, any> | null;

  givenRecognitions?: EmployeeRecognition[];
  receivedRecognitions?: EmployeeRecognition[];
  user?: User;
  department: Department;
  departmentId: number | null;

  ptoRequests?: PtoRequest[];
  projectAssignments?: ProjectAssignment[];
  posts?: Post[];
  organizedEvents?: Event[];
  eventParticipations?: EventParticipant[];
  attendanceRecords?: AttendanceRecord[];
  createdPolls?: Poll[];
  pollVotes?: PollVote[];
}
