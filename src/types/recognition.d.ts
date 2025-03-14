import {Project} from "./project"
import {Employee} from "./employee"

export interface CreateRecognitionDto {
  recognizedById: number;
  recognizedEmployeeId: number;
  projectId?: number;
  category?: string;
  message: string;
}


export interface EmployeeRecognition {
  id: number;
  recognizedBy: Employee;
  recognizedEmployee: Employee;
  project?: Project;
  category?: string;
  message: string;
  createdAt: Date;
}
