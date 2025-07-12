"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Coffee } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/_Components/UserProvider";
import axios from "axios";

type ProfileType = {
  name: string;
  image: string;
};
export const HeaderDash = ({ name, image }: ProfileType) => {
  const [clickedLogOut, setClickedLogOut] = useState<boolean>(false);

  const handleClick = () => {
    setClickedLogOut(!clickedLogOut);
  };
  const { logOut } = useAuth();

  return (
    <header className="flex w-full justify-between  pl-15 pr-15 pt-6">
      <div className="flex items-center gap-2.5">
        <Coffee />
        <p className="text-xl font-bold">Buy Me Coffee</p>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2">
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarImage src={image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
        <button onClick={handleClick}>
          <ChevronDown size={16} />
        </button>
        {clickedLogOut && (
          <button
            onClick={logOut}
            className="absolute z-10 top-15 right-15 w-[100px] bg-white border rounded-sm shadow-sm"
          >
            <p>Log out</p>
          </button>
        )}
      </div>
    </header>
  );
};
