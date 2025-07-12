"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Amount } from "./Amount";
import { FilteredDay } from "./FilteredDay";
import { useEffect, useState } from "react";
import axios from "axios";
import { SupportYet } from "./SupportYet";
import { useAuth } from "@/app/_Components/UserProvider";
import { formatDistanceToNow } from "date-fns";

export type Donation = {
  amount: number;
  specialMessage: string;
  socialURLOrBuyMeACoffee: string;
  donor: Donor;
  createdAt: string;
};

type profile = {
  name: string;
  avatarImage: string;
};

type Donor = {
  profile: profile;
};

export type ProfileProps = {
  name: string;
  social: string;
  image: string;
  donation: Donation[];
};

export function DashboardPage({ name, image, social, donation }: ProfileProps) {
  // const transactions = [
  //   {
  //     name: "Guest",
  //     url: "instagram.com/welesley",
  //     message:
  //       "Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn't that much money it’s all I can contribute at the moment",
  //     amount: 1,
  //     time: "10 hours ago",
  //     id: 1,
  //   },
  //   {
  //     name: "John Doe",
  //     url: "buymeacoffee.com/bdsadas",
  //     message: "Thank you for being so awesome everyday!",
  //     amount: 10,
  //     time: "10 hours ago",
  //     avatar: "/Avatar2.png",
  //     id: 10,
  //   },
  //   {
  //     name: "Fan1",
  //     url: "buymeacoffee.com/supporterone",
  //     message:
  //       "Thank you for being so awesome everyday! You always manage to brighten up my day when I’m feeling down. Although $1 isn't that much money it's all I can contribute at the moment. When I become successful I will be sure to buy you...",
  //     amount: 10,
  //     time: "10 hours ago",
  //     avatar: "/Avatar2.png",
  //     id: 10,
  //   },
  // ];

  console.log(donation, "dd");

  const [amountClicked, setAmountClicked] = useState<boolean>(false);
  const [filterAmount, setFilterAmount] = useState<number | null>(null);
  const [clickedLogOut, setClickedLogOut] = useState<boolean>(false);

  const handleAmountClick = () => {
    setAmountClicked(!amountClicked);
    console.log("darsan");
  };
  if (!donation) {
    return <div>Donation мэдээлэл алга байна</div>;
  }

  const filtered = filterAmount
    ? donation.filter((el) => el.amount === filterAmount)
    : donation;

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={image} alt="Avatar" className="w-12 h-12 rounded-full" />
          <div>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{social}</p>
          </div>
        </div>
        <Button variant="outline" className="bg-black text-white">
          Share page link
        </Button>
      </div>

      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex items-center mb-2 gap-8">
          <h3 className="font-semibold text-lg">Earnings</h3>
          <FilteredDay />
        </div>

        <p className="text-4xl font-bold">
          ${donation.reduce((sum, curr) => sum + curr.amount, 0)}
        </p>
      </div>

      <div>
        <div className="flex justify-between">
          <h4 className="text-lg font-medium mb-4">Recent transactions</h4>
          <Button
            variant={"outline"}
            onClick={handleAmountClick}
            className="cursor-pointer"
          >
            <ChevronDown /> Amount
          </Button>
        </div>
        {amountClicked && <Amount onFilter={setFilterAmount} />}

        <div className="space-y-4">
          {filtered.length === 0 && <SupportYet />}
          {filtered.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-xl p-4 flex justify-between gap-4 shadow-sm"
            >
              <div className="flex gap-3">
                {t.donor.profile.avatarImage ? (
                  <img
                    src={t.donor.profile.avatarImage}
                    alt={t.donor.profile.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-700">
                    {t.donor.profile.name}
                  </div>
                )}
                <div>
                  <p className="font-medium">{t.donor.profile.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.socialURLOrBuyMeACoffee}
                  </p>
                  <p className="text-sm mt-1 text-gray-800">
                    {t.specialMessage}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-green-600">+ ${t.amount}</p>
                <p className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(t.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
