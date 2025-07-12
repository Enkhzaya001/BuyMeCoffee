// export const FilteredDay = () => {
//   const day = ["7", "30", "90"];
//   return (
//     <div className=" w-[170px] bg-white border shadow-sm absolute z-2 ml-26 rounded-sm space-y-1 p-1">
//       {day.map((el, i) => {
//         return <div key={i}>last {el} days</div>;
//       })}
//       <p>All time</p>
//     </div>
//   );
// };

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function FilteredDay() {
  const [value, setValue] = useState("30");

  return (
    <Select defaultValue={value} onValueChange={(val) => setValue(val)}>
      <SelectTrigger className="w-[160px] rounded-lg border px-4 py-2 text-sm font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
        <SelectItem value="90">Last 90 days</SelectItem>
        <SelectItem value="all">All time</SelectItem>
      </SelectContent>
    </Select>
  );
}
