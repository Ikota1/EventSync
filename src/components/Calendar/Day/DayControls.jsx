import React from "react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { arrowLeft, arrowRight } from "../../../assets";
import { add, format, sub } from "date-fns";

const DayControls = ({ date, setDate }) => {
  const prevDay = () => setDate(sub(date, { days: 1 }));
  const nextDay = () => setDate(add(date, { days: 1 }));
  const currentDate = () => setDate(new Date());

  return (
    <div className="flex gap-3 items-center p-2 sticky top-0 z-20">
      <button
        className="text-sm md:text-md px-3 py-1 border rounded focus:outline-none"
        onClick={currentDate}>
        Today
      </button>
      <div className="space-x-1">
        <button
          className="p-1 border rounded focus:outline-none"
          onClick={prevDay}>
          <img src={arrowLeft} className="w-5 h-5" />
        </button>
        <button
          className="p-1 border rounded focus:outline-none"
          onClick={nextDay}>
          <img src={arrowRight} className="w-5 h-5" />
        </button>
      </div>
      <h2 className="font-medium text-md">{format(date, "dd LLLL yyyy")}</h2>
    </div>
  );
}

export default DayControls;
