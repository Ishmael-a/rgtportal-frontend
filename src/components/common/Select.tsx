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
  options: string[];
  selectLabel?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const CustomSelect: React.FC<ICustomSelect> = ({
  options,
  placeholder,
  selectLabel,
  className,
  onChange,
  value,
}) => {
  console.log("value", value);
  return (
    <Select onValueChange={onChange} value={value || ""}>
      <SelectTrigger className={`w-full h-full border-0 ${className}`}>
        <SelectValue placeholder={placeholder || "Select"} />
      </SelectTrigger>
      <SelectContent className="w-full h-full border-0">
        <SelectGroup>
          {selectLabel && <SelectLabel>{selectLabel}</SelectLabel>}
          {options.map((item, index) => (
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
