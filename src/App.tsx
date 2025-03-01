import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import { Button } from "./components/ui/button";
import Feed from "./pages/Feed";
import Dashboard from "./pages/Dashboard";


function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/feed" element={<Feed/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={
        <div className='font-inter'>
          This is the Homepage
          <Button>Add Homepage</Button>
        </div>
      } />


    </Routes>
    </BrowserRouter>
  )
}

export default App
