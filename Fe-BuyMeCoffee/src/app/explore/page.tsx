"use client";

import { useEffect, useState } from "react";
import { HeaderDash } from "../(dashboard)/_Components/HeaderDash";
import { Menu } from "../(dashboard)/_Components/Menu";
import axios from "axios";
import ExploreCreators, { AllPro } from "./_components/ExploreCreater";
import { useAuth } from "../_Components/UserProvider";

const Explore = () => {
  const [profile, setProfile] = useState<any | null>(null);
  const [loginProfile, setLoginProfile] = useState<any | null>(null);
  const [allProfile, setAllProfile] = useState<AllPro[]>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "https://buymecoffee-31me.onrender.com/getAllProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res, "resss");
        setAllProfile(res.data.getUserPro);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  console.log(allProfile, "allPro");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `https://buymecoffee-31me.onrender.com/getProfile/${user?.userId}`
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
    <div>
      <HeaderDash name={loginProfile?.name} image={loginProfile?.avatarImage} />
      <div className="flex">
        <Menu />
        <ExploreCreators allProfile={allProfile} />
      </div>
    </div>
  );
};

export default Explore;
