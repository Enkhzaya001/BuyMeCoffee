"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type UserData = {
  userId: string | null;
};
type AuthContextType = {
  user: UserData | null;
  tokenChecker: (_token: string) => Promise<void>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  // const [profile, setProfile] = useState<any | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  console.log(user?.userId, "user");
  const tokenChecker = async (token: string) => {
    try {
      const response = await axios.post(
        "https://buymecoffee-ei33.onrender.com/verify",
        {
          token: token,
        }
      );
      console.log(response.data.destructToken.userId, "sdfghjkl");

      setUser({
        userId: response.data.destructToken.userId,
      });
      console.log(response.data.destructToken);
    } catch (err) {
      console.log(err);
      //   redirect("/createProfile");
    }
  };
  const logOut = () => {
    localStorage.removeItem("token");
    setUser({ userId: null });
    router.push("/login");
  };

  // const storageKey = "Profile";

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const token = localStorage.getItem("token");
  //     try {
  //       const res = await axios.get("https://buymecoffee-ei33.onrender.com/getProfile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log(res, "resss");
  //     } catch (err: any) {
  //       console.log(err?.response?.data?.message || "Failed to fetch profile");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);
  // localStorage.setItem(storageKey, JSON.stringify(profile));
  // console.log(profile, "pro");

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p className="text-red-500">{error}</p>;
  // if (!profile) return <p>No profile found</p>;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenChecker(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, tokenChecker, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext<AuthContextType>(AuthContext);
