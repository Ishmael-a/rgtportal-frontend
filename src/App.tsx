import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import { Button } from "./components/ui/button";
import Feed from "./pages/Feed";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { EmpLayout } from "./layouts/EmpLayout";
import { HrLayout } from "./layouts/HrLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />

        <Route path="/emp" element={<EmpLayout />}>
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
                <div className="font-inter">
                  This is the Employee Homepage
                  <Button>Add Homepage</Button>
                </div>
              </ProtectedRoute>
            }
          />
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
