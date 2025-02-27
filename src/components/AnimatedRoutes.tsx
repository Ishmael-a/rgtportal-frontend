import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Feed from "@/pages/common/Feed";
import EventsCalendar from "@/pages/Employee/EventsCalendar";
import Login from "@/pages/Login";
import All_Teams from "@/pages/Employee/Projects";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/events-calendar"
          element={
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <EventsCalendar />
            </motion.div>
          }
        />
        <Route path="/all-teams" element={<All_Teams />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
