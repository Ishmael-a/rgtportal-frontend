import Header from "@/components/common/Header";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const AllDepartments = () => {
  return (
    <main>
      <Header
        title="All Departments"
        description="These are all current Departments"
      >
        <div className="flex justify-between items-center bg-white rounded-md">
          <Input
            className="border-0 shadow-none bg-white"
            placeholder="Search for a Department"
          />
          <Search />
        </div>
      </Header>
    </main>
  );
};

export default AllDepartments;
