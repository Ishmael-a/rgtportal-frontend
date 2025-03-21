import Header from "@/components/common/Header";
import DepartmentCard from "@/components/DepartmentCard";
import { Input } from "@/components/ui/input";
import { RootState } from "@/state/store";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const AllDepartments = () => {
  const { departments } = useSelector((state: RootState) => state.sharedState);

  return (
    <main>
      <Header
        title="All Departments"
        description="These are all current Departments"
      >
        <div className="flex justify-between items-center bg-white rounded-md p-2 mr-3">
          <Input
            className="border-0 shadow-none bg-white focus:outline-none focus:ring-0"
            placeholder="Search for a Department"
          />
          <Search />
        </div>
      </Header>

      <section className="flex flex-wrap gap-6 pt-10">
        {departments.map((item, index) => (
          <DepartmentCard
            name={item.name}
            employees={item.employees}
            id={index}
          />
        ))}
      </section>
    </main>
  );
};

export default AllDepartments;
