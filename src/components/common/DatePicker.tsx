"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IDatePicker {
  placeholder?: string;
  value?: Date;
  onChange?: (val: Date | undefined) => void;
}

const DatePicker: React.FC<IDatePicker> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [date, setDate] = React.useState<Date | undefined>(value);
  // Update Formik's state when the date changes
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " w-full h-full justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-[#7B7A80]">
              {placeholder ? placeholder : "Pick a date"}
            </span>
          )}

          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" style={{ zIndex: 170 }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
          classNames={{
            day_selected:
              "bg-[#C0AFFF] text-white hover:bg-[#C0AFFF] focus:bg-[#C0AFFF]",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
