"use client";
import { useEffect, useState } from "react";
import { DashboardPage } from "../(dashboard)/_Components/Dashboard";
import { HeaderDash } from "../(dashboard)/_Components/HeaderDash";
import { Menu } from "../(dashboard)/_Components/Menu";
import axios from "axios";
import { useAuth } from "@/app/_Components/UserProvider";
import { useParams } from "next/navigation";
import { AccountProfile } from "./_Components/profile";
import AccountPaymentForm from "./_Components/payment";

const AccountSettings = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [getDonation, setGetDonation] = useState<any | null>(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://buymecoffee-u98u.onrender.com/getProfile/${user?.userId}`
        );
        console.log(res, "resss");
        setProfile(res.data.getUserPro);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  console.log(profile, "pro");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile found</p>;
  return (
    <div className="">
      <HeaderDash name={profile.name} image={profile.avatarImage} />
      <div className="flex">
        <Menu />
        <div>
          <AccountProfile
            name={profile.name}
            social={profile.socialMediaURL}
            image={profile.avatarImage}
            about={profile.about}
            userId={profile.userId}
          />
          <AccountPaymentForm />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
