"use client";
import { Input } from "@/components/ui/input";
import { HeaderDash } from "../../../(dashboard)/_Components/HeaderDash";
import ProfileCard from "../../_Components/ProfileCard";
import SupportCard from "../../_Components/SupportCard";
import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/_Components/UserProvider";

const ViewPage = () => {
  const { id } = useParams();

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();
  const [preview, setPreview] = useState<string | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginProfile, setLoginProfile] = useState<any | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [getDonation, setGetDonation] = useState<any | null>(null);
  const [value, setValue] = useState("");
  const [qr, setQr] = useState("");
  const [url, setUrl] = useState("");

  const { user } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDelte = () => {
    setPreview(null);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/getProfile/${user?.userId}`
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

  console.log(loginProfile, "mylog");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/getProfile/${id}`);
        console.log(res, "resss");
        setProfile(res.data.getUserPro);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`http://localhost:8000/donation/${id}`, {
        amount: selectedTab,
        specialMessage: value,
        socialURLOrBuyMeACoffee: url,
        donorId: user?.userId,
      });
      setUrl(loginProfile.socialMediaURL);
      setQr(res.data.qr);
    } catch (error: any) {
      console.error(" error:", error);
      if (error.response && error.response.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Сервертэй холбогдож чадсангүй.");
      }
    }
    setLoading(false);
  };

  console.log(qr, "qrr");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/getDonation/${id}`);
        setGetDonation(res.data.getDonation);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div
            onClick={handleClick}
            className="h-40 bg-gray-200 flex items-center justify-center rounded-md mb-6"
          >
            {preview ? (
              <div className="w-full h-full object-cover rounded-sm relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-sm "
                />
              </div>
            ) : (
              <button className="bg-black text-white py-1 px-3 rounded">
                Add a cover image
              </button>
            )}
            <Input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {preview && (
            <button
              onClick={handleDelte}
              className="absolute z-1 right-58 top-22  shadow-sm w-5 "
            >
              <Trash2 color="red" size={22} />
            </button>
          )}
          {/* Profile + Support Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileCard
              donation={getDonation}
              name={profile?.name}
              social={profile?.socialMediaURL}
              image={profile?.avatarImage}
              about={profile?.about}
              userId={profile?.userId}
            />
            <SupportCard
              id={id}
              qr={qr}
              loading={loading}
              handleSubmit={handleSubmit}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab.toString()}
              setValue={setValue}
              value={value}
              url={loginProfile?.socialMediaURL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
