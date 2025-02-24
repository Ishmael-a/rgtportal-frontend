import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
// <Routes>
//   {/* <Route path="/feed" element={<Feed />} />
//   <Route path="/login" element={<Login />} /> */}
//   {/* <Route path="/" element={
//   <div className='font-inter'>
//     This is the Homepage
//     <Button>Add Homepage</Button>
//   </div>
// } /> */}
// </Routes>

export default App;
