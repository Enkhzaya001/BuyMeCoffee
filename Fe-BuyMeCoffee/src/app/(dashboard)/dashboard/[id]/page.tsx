"use client";
import { useEffect, useState } from "react";
import { DashboardPage, Donation } from "../../_Components/Dashboard";
import { HeaderDash } from "../../_Components/HeaderDash";
import { Menu } from "../../_Components/Menu";
import axios from "axios";
import { useAuth } from "@/app/_Components/UserProvider";
import { useParams } from "next/navigation";

const Dashboard = () => {
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
          `https://buymecoffee-31me.onrender.com/getProfile/${user?.userId}`
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
  // console.log(profile, "pro");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://buymecoffee-31me.onrender.com/getDonation/${id}`
        );
        setGetDonation(res.data.getDonation);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);
  console.log(getDonation, "get donation dash");

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p>No profile found</p>;
  return (
    <div>
      <HeaderDash name={profile.name} image={profile.avatarImage} />
      <div className="flex">
        <Menu />
        <DashboardPage
          donation={getDonation}
          name={profile.name}
          image={profile.avatarImage}
          social={profile.socialMediaURL}
        />
      </div>
    </div>
  );
};

export default Dashboard;
