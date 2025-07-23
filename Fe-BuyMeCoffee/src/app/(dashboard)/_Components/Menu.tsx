"use client";
import { useAuth } from "@/app/_Components/UserProvider";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Menu = () => {
  const [loginProfile, setLoginProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://buymecoffee-ei33.onrender.com/getProfile/" + user?.userId
        );
        console.log(res, "resss");
        setLoginProfile(res.data.getUserPro);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);
  return (
    <div className="pl-15 p-5">
      <div className="w-[251px] flex flex-col gap-2 text-xl">
        <Link href={`/dashboard/${user?.userId}`}>
          <Button
            variant="ghost"
            className="rounded-md p-1 w-full flex justify-start items-center gap-2"
          >
            Home
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            variant="ghost"
            className="p-1 w-full flex justify-start items-center gap-2"
          >
            Explore
          </Button>
        </Link>
        <Link href={`/viewPage/${user?.userId}`}>
          <Button
            variant="ghost"
            className="p-1 w-full flex justify-start items-center gap-2"
          >
            View page <SquareArrowOutUpRight size={15} />
          </Button>
        </Link>
        <Link href="/accountSettings">
          <Button
            variant="ghost"
            className="p-1 w-full flex justify-start items-center gap-2"
          >
            Account settings
          </Button>
        </Link>
      </div>
    </div>
  );
};
