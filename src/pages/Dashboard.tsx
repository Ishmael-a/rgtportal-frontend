import EmployeeTable from "@/components/dash/EmployeeTable";
import RightSidebar from "@/components/dash/RightSidebar";
import StatsGrid from "@/components/dash/StatsCard";
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"

const Dashboard = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
        <Header />
      <div className="flex flex-row justify-between">
        <Sidebar />
        <div className="flex flex-row gap-4">
          <div className="w-full">
            <StatsGrid />
            <EmployeeTable />
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Dashboard;
