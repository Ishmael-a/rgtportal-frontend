import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ICustomSelect {
  placeholder?: string;
  data: string[];
  selectLabel?: string;
}

const CustomSelect: React.FC<ICustomSelect> = ({
  data,
  placeholder,
  selectLabel,
}) => {
  return (
    <Select>
      <SelectTrigger className="w-full h-full">
        <SelectValue placeholder={`${placeholder ? placeholder : "Select"}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
          {data.map((item, index) => (
            <SelectItem value={item.toLowerCase()} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
