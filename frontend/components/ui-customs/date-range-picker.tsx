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
import { AppDispatch, AppState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { AppAction } from "@/redux/app-slice";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateRange } from "react-day-picker";

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const isMobile = useIsMobile();
  const dispatch = useDispatch<AppDispatch>();
  const date = useSelector((state: AppState) => state.app.date);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    dispatch(AppAction.setDate(selectedDate));
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {!isMobile && (
              <React.Fragment>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </React.Fragment>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            fromYear={2014}
            toYear={2014}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
