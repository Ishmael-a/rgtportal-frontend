import { Button } from './components/ui/button';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"


function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/register" element={<Login/>} />
      <Route path="/" element={
        <div className='font-inter'>
          This is the Homepage
        </div>
      } />


    </Routes>
    </BrowserRouter>
  )
}

export default App
