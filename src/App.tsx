import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Button } from "./components/ui/button";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { EmpLayout } from "./layouts/EmpLayout";
import { HrLayout } from "./layouts/HrLayout";
import Feed from "./pages/Employee/Feed";
import EventsCalendar from "./pages/Employee/EventsCalendar";
import Projects from "./pages/Employee/Projects";
import ProjectDetails from "./pages/Employee/ProjectDetails";
import TimeOff from "./pages/Employee/TimeOff";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<EmpLayout />}>
          <Route
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
          />
          <Route path="/feed" element={<Feed />} />
          <Route path="/events-calendar" element={<EventsCalendar />} />
          <Route path="/all-projects" element={<Projects />} />
          <Route path="/all-projects/:id" element={<ProjectDetails />} />
          <Route path="/time-off" element={<TimeOff />} />
        </Route>

        <Route path="/hr" element={<HrLayout />}>
          <Route
            index
            element={
              <div className="font-inter">
                This is the HR Homepage
                <Button>Add Homepage</Button>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
