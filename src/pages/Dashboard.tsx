import EmployeeTable from "@/components/dash/EmployeeTable";
import RightSidebar from "@/components/dash/RightSidebar";
import StatsGrid from "@/components/dash/StatsCard";
import Header from "@/components/Header"
// import Sidebar from "@/components/Sidebar"
import {HrSideBar} from "../components/HrSideBar"

const Dashboard = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
        <Header />
      <div className="flex flex-row justify-between">
        <HrSideBar />
        <div className="flex flex-col w-full gap-4 px-4">
            <StatsGrid />
            <EmployeeTable />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
