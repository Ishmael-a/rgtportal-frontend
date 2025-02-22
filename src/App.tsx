import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import { Button } from "./components/ui/button";


function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/register" element={<Login/>} />
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
