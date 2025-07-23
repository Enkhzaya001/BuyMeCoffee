"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // эсвэл энгийн <button>
import { useEffect, useState } from "react";
import axios from "axios";

export default function DonationSuccess() {
  const router = useRouter();
  const [profile, setProfile] = useState<any | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://buymecoffee-31me.onrender.com/getProfile/${id}`
        );
        console.log(res, "resss");
        setProfile(res.data.getUserPro);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [id]);

  console.log(profile, "pp");

  if (!profile) {
    <p>Profile not found</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <svg
          className="w-10 h-10 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-xl font-semibold text-center mb-6">
        Donation Complete!
      </h1>

      <div className="max-w-md w-full bg-white border rounded-md p-4 shadow-sm flex items-start gap-4 mb-6">
        <div className="rounded-full w-[150px] f-full">
          <img
            src={profile?.avatarImage}
            alt="Avatar"
            className=" w-[50px] h-[50px] object-cover rounded-full"
          />
        </div>

        <div className="text-sm text-gray-700">
          <p className="font-semibold">{profile?.name}</p>
          <p className="mt-1">{profile?.successMessage}</p>
        </div>
      </div>

      <Button
        onClick={() => router.push("/explore")}
        className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
      >
        Return to explore
      </Button>
    </div>
  );
}
