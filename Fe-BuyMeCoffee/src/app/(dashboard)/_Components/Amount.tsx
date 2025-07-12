"use client";
import { useState } from "react";

type Props = {
  onFilter: (amount: number | null) => void;
};

export const Amount = ({ onFilter }: Props) => {
  const amount = [1, 2, 5, 10];
  const [selected, setSelected] = useState<number | null>(null);

  const handleClick = (val: number) => {
    const newValue = selected === val ? null : val;
    setSelected(newValue);
    onFilter(newValue);
  };

  return (
    <div className="h-[136px] absolute z-10 w-[198px] bg-white border right-36 rounded-sm shadow-sm">
      <div className="space-y-2 pl-1 pt-1">
        {amount.map((el, i) => (
          <button
            type="button"
            onClick={() => handleClick(el)}
            key={i}
            className={`flex items-center gap-2 w-full px-2 py-1 rounded ${
              selected === el
                ? "bg-black text-white"
                : "bg-white text-black border border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={selected === el}
              readOnly
            />
            <p>${el}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
