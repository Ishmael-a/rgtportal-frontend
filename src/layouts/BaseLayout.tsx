import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { HrSideBar } from "@/components/SideBar/HrSideBar";
import { SideBar } from "@/components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import { useAuthContextProvider } from "../hooks/useAuthContextProvider";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useInitializeSharedData } from "@/hooks/useInitializeSharedData";

export const BaseLayout = () => {
  const { currentUser: user } = useAuthContextProvider();
  const { isLoading, isError } = useInitializeSharedData();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner label="Fetching Shared Data..." size={32} />;
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Error loading shared data</div>
      </div>
    );
  }

  return (
    <div>
      <header
        className="fixed top-0 flex items-center justify-between p-4 bg-white border-b w-full"
        style={{ zIndex: 150 }}
      >
        {/* Left section with logo */}
        <div className="flex items-center">
          <div className="">
            <img src="/RgtPortalLogo.svg" className="w-24" />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          {/* Center section with search */}
          <div className="relative w-[30%]">
            <Search className="absolute left-2 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 py-5 bg-gray-50 border-none outline-none shadow-none"
            />
          </div>

          {/* Right section with notification */}
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>
      <div className="flex sm:px-[13px] sm:space-x-[17px] w-screen h-screen">
        <div
          className="h-screen text-center sm:py-[78px] hidden sm:block overflow-y-scroll"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          {user?.role.name === "HR" && <HrSideBar />}
          {user?.role.name === "EMPLOYEE" && <SideBar />}
        </div>

        <div
          className="pt-[78px]  flex-1 md:w-3/5 h-screen overflow-y-auto"
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};
