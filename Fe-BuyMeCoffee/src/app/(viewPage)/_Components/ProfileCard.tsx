"use client";

import { useAuth } from "@/app/_Components/UserProvider";
import { ProEdit } from "./ProEdit";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Donation } from "@/app/(dashboard)/_Components/Dashboard";
import { formatDistanceToNow } from "date-fns";

export type Props = {
  name: string;
  social: string;
  image: string;
  about: string;
  userId: string;
  donation: Donation[];
};
function ProfileCard({ name, social, image, about, userId, donation }: Props) {
  const [getDonation, setGetDonation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const { id } = useParams();

  if (!donation) {
    return <div>Donation мэдээлэл алга байна</div>;
  }

  return (
    <div className="bg-white p-6 rounded-md shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img src={image} alt="Jake" className="w-12 h-12 rounded-full" />
          <span className="font-semibold text-lg">{name}</span>
        </div>
        {user?.userId === userId && (
          <ProEdit
            name={name}
            social={social}
            image={image}
            about={about}
            userId={userId}
          />
        )}
      </div>

      {/* About Section */}
      <div className="mb-4">
        <h2 className="font-medium mb-1">About Jake</h2>
        <p className="text-sm text-gray-600">{about}</p>
      </div>

      {/* Social Link */}
      <div className="mb-4">
        <h2 className="font-medium mb-1">Social media URL</h2>
        <p className="text-sm text-blue-500 break-all">{social}</p>
      </div>

      {/* Supporters */}
      {donation.length === 0 && (
        <div>
          <h2 className="font-medium mb-1">Recent Supporters</h2>
          <div className="flex items-center justify-center h-24 border rounded-md">
            <div className="text-center text-gray-500">
              <div className="text-2xl">❤️</div>
              <p className="text-sm mt-1">Be the first one to support Jake</p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {donation.map((t, idx) => (
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
                <p className="text-sm mt-1 text-gray-800">{t.specialMessage}</p>
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
  );
}

export default ProfileCard;
