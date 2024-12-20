"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import moment from "moment";

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function areAllTimesTaken(startTime, endTime, bookedRanges) {
  const mainStart = timeToMinutes(startTime);
  const mainEnd = timeToMinutes(endTime);

  // Sort bookedRanges by start time
  bookedRanges.sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  let currentStart = mainStart;

  for (let i = 0; i < bookedRanges.length; i++) {
    const rangeStart = timeToMinutes(bookedRanges[i].start);
    const rangeEnd = timeToMinutes(bookedRanges[i].end);

    if (rangeStart > currentStart) {
      return false; // There's a gap between booked ranges
    }

    currentStart = Math.max(currentStart, rangeEnd);

    if (currentStart >= mainEnd) {
      return true; // All times are taken
    }
  }

  return currentStart >= mainEnd;
}
const mainStartTime = "09:00";
const mainEndTime = "18:00";
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  dates,
  ...props
}) {
  const checkList = (items) => {
    if (
      items.find(
        (d) =>
          moment(
            new Date(d?.startTime).setHours(
              new Date(d?.startTime).getHours() -
                new Date().getTimezoneOffset() / 60
            )
          ).format("HH:mm") <= "06:00"
      ) &&
      items.find(
        (d) =>
          moment(
            new Date(d?.endTime).setHours(
              new Date(d?.endTime).getHours() -
                new Date().getTimezoneOffset() / 60
            )
          ).format("HH:mm") >= "21:00"
      )
    ) {
      return "full";
    } else if (items?.length > 0) {
      return "part";
    } else {
      return "none";
    }
  };
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months:
          "flex flex-col sm:flex-row sm:justify-center space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-slate-500 rounded-md w-14 xl:w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-14 xl:w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-14 xl:w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
        day_today:
          "bg-slate-100 text-slate-900-[#fff] dark:bg-slate-800 dark:text-slate-50",
        day_outside:
          "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle:
          "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        DayContent: ({ date, className, classNames, ...props }) => {
          const items = dates.filter(
            (d) =>
              moment(d?.dateRequested).format("YYYY-MM-DD") ===
              moment(date).format("YYYY-MM-DD")
          );
          return (
            <div
              className={cn(
                className,
                "flex items-center justify-center text-sm text-center ",
                areAllTimesTaken(mainStartTime, mainEndTime, items)
                  ? "bg-red-500 px-2 py-0.5 rounded-full"
                  : !areAllTimesTaken(mainStartTime, mainEndTime, items) &&
                    items?.length > 0
                  ? "bg-yellow-500 px-2 py-0.5 rounded-full"
                  : "px-2 py-0.5 rounded-full"
              )}
              {...props}
            >
              {date.getDate()}
            </div>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
