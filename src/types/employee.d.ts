/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassNameValue } from "tailwind-merge";
interface IProjectCard {
  id: string | number;
  members: IProjectMembers[]| Employee[];
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

interface IPollUI {
  pollOption: string;
  percentage: number;
  totalVotes: number;
}

interface IImage {
  url: string;
  alt?: string;
}

interface IAvtrBlock {
  name: string;
  role: string;
  avatarUrl: string;
  fallBack?: string;
}

interface IPost {
  avtrDets: IAvtrBlock;
  text: string;
  poll?: IPollUI[];
  image?: IImage;
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

type WorkType =  "hybrid" | "remote"




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