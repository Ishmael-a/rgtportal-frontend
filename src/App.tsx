import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Button } from "./components/ui/button";
import NotFoundPage from "./pages/NotFoundPage";
// import ProtectedRoute from "./components/common/ProtectedRoute";
import { EmpLayout } from "./layouts/EmpLayout";
import { HrLayout } from "./layouts/HrLayout";
import Feed from "./pages/Employee/Feed";
import EventsCalendar from "./pages/Employee/EventsCalendar";
import Projects from "./pages/Employee/Projects";
import ProjectDetails from "./pages/Employee/ProjectDetails";
import TimeOff from "./pages/Employee/TimeOff";
import AllDepartments from "./pages/Manager/AllDepartments";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />

        <Route path="/emp" element={<EmpLayout />}>
          {/* <Route
            index
            path="/emp"
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <div className="font-inter">
                  This is the Employee Homepage
                  <Button>Add Homepage</Button>
                </div>
              </ProtectedRoute>
            }
          /> */}
          <Route index path="feed" element={<Feed />} />
          <Route path="events-calendar" element={<EventsCalendar />} />
          <Route path="all-projects/" element={<Projects />}>
            <Route path=":id" element={<ProjectDetails />} />
          </Route>
          <Route path="time-off" element={<TimeOff />} />
        </Route>

        {/* Manager routes */}
        <Route path="/mgr" element={<EmpLayout />}>
          <Route path="all-departments" element={<AllDepartments />} />
        </Route>

        {/* HR routes */}
        <Route path="/hr" element={<HrLayout />}>
          <Route
            index
            path="dashboard"
            element={
              <div className="font-inter">
                This is the HR Homepage
                <Button>Add Homepage</Button>
              </div>
            }
          />

          <Route path="feed" element={<Feed />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
