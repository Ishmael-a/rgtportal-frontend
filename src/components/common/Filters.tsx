import { X } from "lucide-react";
import DatePicker from "./DatePicker";
import CustomSelect from "./Select";

interface IFilters {
  select_1_options: string[];
  select_1_placeholder?: string;
  select_2_options: string[];
  select_2_placeholder?: string;
}

const Filters: React.FC<IFilters> = ({
  select_1_options,
  select_2_options,
  select_1_placeholder,
  select_2_placeholder,
}) => {
  return (
    <div className="flex  gap-3 h-[50px] my-8">
      <DatePicker className="h-full border-0 bg-[#F6F6F9] sm:w-[320px] text-xs sm:text-sm font-semibold rounded-[12px]" />
      <CustomSelect
        placeholder={select_1_placeholder}
        options={select_1_options}
        className="bg-[#F6F6F9] border-0 sm:w-[320px] text-xs sm:text-sm font-semibold text-nowrap rounded-[12px]"
      />
      <CustomSelect
        placeholder={select_2_placeholder}
        options={select_2_options}
        className="bg-[#F6F6F9] border-0 sm:w-[320px] text-xs sm:text-sm font-semibold text-nowrap rounded-[12px]"
      />
      <div className="text-[#8A8A8C] font-semibold text-sm flex items-center p-1 flex-1 justify-center hover:bg-slate-200 rounded-[12px] transition-all duration-300 ease-in cursor-pointer bg-slate-100">
        <X className="w-4 md:hidden sm:w-8" />
        <p className="hidden md:block">Reset</p>
      </div>
    </div>
  );
};

export default Filters;
