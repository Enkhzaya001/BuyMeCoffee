"use client";
import { useAuth } from "@/app/_Components/UserProvider";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  const { logOut } = useAuth();
  return (
    <header className="flex w-full justify-between  absolute z-10 pl-15 pr-15 pt-6  ">
      <div className="flex  items-center gap-2.5">
        <Coffee />
        <p className="text-2xl font-bold">Buy Me Coffee </p>
      </div>
      <div>
        <Button onClick={logOut} variant={"outline"} className="bg-[#f3f5f6] ">
          Log out
        </Button>
      </div>
    </header>
  );
};
