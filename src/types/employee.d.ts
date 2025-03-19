/* eslint-disable @typescript-eslint/no-explicit-any */
// import { ClassNameValue } from "tailwind-merge";
import { Poll } from "./polls";
import { User } from "./authUser";
import { Department } from "./department";
interface IProjectCard {
  id: string | number;
  members: IProjectMembers[] | Employee[];
  name: string;
  leadName?: string;
  path: string;
  includeBgImg?: boolean
}
interface IProjectType {
  id: string | number;
  members: IProjectMembers[];
  name: string;
  leadName?: string;
}

interface IProjectMembers {
  id: number;
  name: string;
  avtr: { url: string; fallBack: string };
  department: string;
  role: string;
}

interface IFeed {
  poll?: Poll;
  post?: IPost;
  postId?:number
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


export type EmployeeType = "full_time" | "part_time" | "contractor" | "nsp"



export type WorkType =  "hybrid" | "remote"



enum LeaveType {
  QUIT = "quit",
  LAYOFF = "layoff",
  DISMISSED = "dismissed",
  OTHER = "other",
}




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
  notes?: string | null;

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


export interface Agency {
  name: string;
  paid: boolean;
  invoiceReceived: boolean;
  invoiceAmount?: number;
  invoiceNumber?: string;
  invoiceDate?: Date;
  invoiceDueDate?: Date;
}

export interface UserReference {
  id: number;
}



export interface CreateEmployeeInterface {
  user: UserReference;
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: Date;
  departmentId?: number;
  position?: string;
  hireDate?: Date;
  contactDetails?: Record<string, any> | null;
  agency?: Agency;
}

export interface UpdateEmployeeInterface extends CreateEmployeeInterface {
  sickDaysBalance?: number;
  vacationDaysBalance?: number;
  annualDaysOff?: number;
  leaveType?: LeaveType;
  leaveExplanation?: string;
  employeeType?: EmployeeType;
  workType?: WorkType;
  endDate?: Date;
  skills?: string[] | null;
  notes?: string;
  roleId?: number;
  department?: Department;
}
