"use client";
import { useEffect, useState } from "react";
import { Header } from "../(createProfile)/_Components/Header";
import { HeaderDash } from "../(dashboard)/_Components/HeaderDash";
import axios from "axios";
import { useAuth } from "../_Components/UserProvider";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loginProfile, setLoginProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "https://buymecoffee-31me.onrender.com/getProfile/" + user?.userId
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
      {children}
    </div>
  );
}
