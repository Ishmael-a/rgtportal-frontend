import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import { Button } from "./components/ui/button";
import Feed from "./pages/Feed";
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/common/ProtectedRoute";
import { EmpLayout } from "./layouts/EmpLayout";
import { HrLayout } from "./layouts/HrLayout";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />


        {/* Common routes with base layout */}
        <Route element={<EmpLayout />}>
          {/* <Route element={<ProtectedRoute allowedRoles={["EMPLOYEE", "HR", "SUPER_ADMIN"]} />}> */}
            <Route path="/feed" element={<Feed />} />
          {/* </Route> */}
        </Route>


        {/* Employee routes */}
        <Route path="/emp" element={<EmpLayout />}>
          {/* <Route element={<ProtectedRoute allowedRoles={["SUPER_ADMIN"]} />}> */}
            <Route index element={
              <div className="font-inter">
                This is the Employee Homepage
                <Button>Add Homepage</Button>
              </div>
              }
            />
          {/* </Route> */}
        </Route>

        {/* HR routes */}
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


        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
