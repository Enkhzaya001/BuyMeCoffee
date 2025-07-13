"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader } from "lucide-react";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepProps } from "./SignUpStep1";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";

export const SignUpStep2 = ({ username }: StepProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const showHandlePassword = () => {
    setShowPassword(!showPassword);
  };

  const formSchema = z.object({
    email: z.string().email("И-мэйл буруу байна"),
    password: z
      .string()
      .min(6, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой")
      .regex(/[a-z]/, "Жижиг үсэг агуулсан байх ёстой")
      .regex(/[A-Z]/, "Том үсэг агуулсан байх ёстой"),
    // .regex(/[0-9]/, "Тоон тэмдэгт агуулсан байх ёстой")
    // .regex(/[^a-zA-Z0-9]/, "Тусгай тэмдэгт (!@#$%...) агуулсан байх ёстой")
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/signup", {
        username: username,
        email: values.email,
        password: values.password,
      });
      toast.success("Амжилттай нэвтэрлээ!");
      router.push("/login");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response && error.response.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Сервертэй холбогдож чадсангүй.");
      }
    }
    setLoading(false);
  };

  // if (user?.userId) {
  //     redirect("/creatProfile");
  //   }
  // }

  // const isValueValid = !form.watch("email") || !form.watch("password");
  return (
    <div className="flex h-screen p-8 justify-center items-center">
      <Toaster richColors position="top-center" />
      <motion.div
        key="image"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 10 }}
        transition={{ duration: 1 }}
      >
        <div>
          <div className="flex py-2 flex-col">
            <span className="text-2xl font-semibold">Create your account</span>
          </div>

          <Form {...form}>
            <form
              className="p-2 w-[400px] justify-between items-center m-auto"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="py-2 text-md">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter here email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="py-2 text-md">Password</FormLabel>
                    <button
                      type="button"
                      onClick={showHandlePassword}
                      className="absolute top-15 right-0 px-2.5"
                    >
                      <Eye size={18} color="gray" />
                    </button>
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter here password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="submit"
                disabled={loading}
                className={`bg-gray-500 w-full mt-10 text-white px-4 py-2 rounded ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
              </button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  );
};
