/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassNameValue } from "tailwind-merge";
interface IProjectCard {
  id: string | number;
  members: IProjectMembers[]| Employee[];
  name: string;
  leadName?: string;
  path: string;
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

export interface Employee {
  id: number;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  position: string | null;
  hireDate: Date | null;
  sickDaysBalance: number;
  annualDaysOff: number;
  vacationDaysBalance: number;
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