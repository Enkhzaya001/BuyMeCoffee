"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useAuth } from "@/app/_Components/UserProvider";
import { motion } from "framer-motion";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  about: z.string().min(5, { message: "Tell us about yourself" }),
  social: z.string().url({ message: "Enter a valid URL" }),
  image: z.string({ message: "Enter a image" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const Profile = ({ onNext }: { onNext: () => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const { user, tokenChecker } = useAuth();
  console.log(user?.userId, "userrr");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      about: "",
      social: "",
      image: "",
    },
  });

  const handleClick = () => inputRef.current?.click();

  const imageUpload = async () => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "BuyMeCoffee");
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dryhqirib/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      return result.secure_url;
    } catch (error: unknown) {
      return { error: "failed to upload image" };
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const handleSubmit = async (values: ProfileFormData) => {
    setLoading(true);
    try {
      if (!user?.userId) {
        alert("Хэрэглэгчийн мэдээлэл олдсонгүй.");
        return;
      }
      const url = await imageUpload();
      if (!url) {
        alert("Зураг байршуулахад алдаа гарлаа.");
        return;
      }
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "https://buymecoffee-31me.onrender.com/profile",
        {
          name: values.name,
          about: values.about,
          social: values.social,
          image: url,
          userId: user.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onNext();
    } catch (err: any) {
      console.error(
        " Profile submit error:",
        err?.response?.data || err.message
      );
      alert(err?.response?.data?.message || "Сервертэй холбогдож чадсангүй.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white px-2 py-4 flex justify-center">
      <motion.div
        key="image"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full max-w-xl profile-container space-y-4 sm:p-10 border border-gray-200 rounded-xl shadow-sm bg-white">
          <h1 className="font-bold text-2xl sm:text-3xl">
            Complete your profile page
          </h1>

          {/* Upload */}
          <div className="space-y-2">
            <p className="text-base font-medium">Add photo</p>
            <div
              onClick={handleClick}
              className="cursor-pointer border-dotted border-2 border-gray-300 w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] rounded-full flex items-center justify-center overflow-hidden text-gray-500 text-sm hover:border-gray-500 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Camera className="w-6 h-6 sm:w-8 sm:h-8" />
              )}
            </div>
            <Input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="h-11 text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full h-[100px] sm:h-[120px] border rounded-md p-3 text-base resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social media URL</FormLabel>
                    <FormControl>
                      <Input className="h-11 text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gray-500 text-white py-2 rounded mt-6 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Түр хүлээнэ үү..." : "Үргэлжлүүлэх"}
              </button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};
