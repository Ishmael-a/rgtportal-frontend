import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WithPermission } from "@/components/common/WithPermission";
import { BaseLayout } from "./layouts/BaseLayout";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Feed from "./pages/common/Feed";
import { HRDashboard } from "./pages/HR/HRDashboard";
import { AllDepartments } from "./pages/HR/AllDepartments";
import EventsCalendar from "./pages/Employee/EventsCalendar";
import Projects from "./pages/Employee/Projects";
import ProjectDetails from "./pages/Employee/ProjectDetails";
import TimeOff from "./pages/Employee/TimeOff";
import RecruitmentPage from "./pages/HR/Recruitment";
import { RecruitmentType } from "./lib/enums";
import CandidateDetailView from "./pages/HR/CandidateDetailed";
import { ManageEmployees } from "./pages/HR/ManageEmployees";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        {/* Employee routes */}
        <Route path="/emp" element={<BaseLayout />}>
          <Route index path="feed" element={<Feed />} />
          <Route path="events-calendar" element={<EventsCalendar />} />
          <Route path="all-projects/" element={<Projects />} />
          <Route path="all-projects/:id" element={<ProjectDetails />} />
          <Route path="time-off" element={<TimeOff />} />
        </Route>

        {/* HR routes */}
        <Route path="/hr" element={<BaseLayout />}>
          <Route index path="dashboard" element={<HRDashboard />} />
          <Route
            path="alldepartments"
            element={
              <WithPermission
                resource="employeeRecords"
                action="view"
                redirectTo="/hr/dashboard"
              >
                <AllDepartments />
              </WithPermission>
            }
          />
          <Route  path="manageemployees"  element={
              <WithPermission 
                resource="employeeRecords" 
                action="edit" 
                redirectTo="/hr/dashboard"
              >
                <ManageEmployees/>
              </WithPermission>
            }
          />

          <Route path="feed" element={<Feed />} />
          <Route path="recruitment">
            <Route
              path="employee"
              element={<RecruitmentPage type={RecruitmentType.EMPLOYEE} />}
            />
            <Route
              path="nss"
              element={<RecruitmentPage type={RecruitmentType.NSS} />}
            />
            <Route
              path="candidate/:id"
              element={<CandidateDetailView />}
            />
          </Route>
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
