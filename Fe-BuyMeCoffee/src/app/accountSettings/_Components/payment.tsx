"use client";

import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/app/_Components/UserProvider";

const formSchema = z.object({
  country: z.string().nonempty("Please select a country"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number is too long"),
  expiryMonth: z.string().nonempty("Enter month"),
  expiryYear: z.string().nonempty("Enter year"),
  cvc: z
    .string()
    .min(3, "CVC must be at least 3 digits")
    .max(4, "CVC is too long"),
});

type FormValues = z.infer<typeof formSchema>;

export default function AccountPaymentForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, tokenChecker } = useAuth();
  const [getPaymentInfo, setGetPaymentInfo] = useState<any | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvc: "",
    },
  });

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getBankCart");
        console.log(res, "payment");
        setGetPaymentInfo(res.data);
      } catch (err: any) {
        console.log(err?.response?.data?.message || "Failed to fetch profile");
      }
    };
    fetchPayment();
  }, []);

  useEffect(() => {
    if (getPaymentInfo?.getUserPayment) {
      const expiryDate = new Date(getPaymentInfo.getUserPayment.expiryDate);

      const expiryYear = expiryDate.getFullYear().toString();
      const expiryMonth = (expiryDate.getMonth() + 1).toString();

      form.reset({
        country: getPaymentInfo.getUserPayment.country || "",
        firstName: getPaymentInfo.getUserPayment.firstName || "",
        lastName: getPaymentInfo.getUserPayment.lastName || "",
        cardNumber: getPaymentInfo.getUserPayment.cardNumber || "",
        expiryMonth,
        expiryYear,
        cvc: "",
      });
    }
  }, [getPaymentInfo, form]);

  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/bankcard",
        {
          country: values.country,
          firstName: values.firstName,
          lastName: values.lastName,
          cardNumber: values.cardNumber,
          expiryMonth: values.expiryMonth,
          expiryYear: values.expiryYear,
          userId: user?.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        alert(res.data.message);
      }
      router.push(`/dashboard/${user?.userId}`);
    } catch (err) {
      console.error("BankCard error:", err);
      alert("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const currentMonth = new Date().getMonth();
  const month = Array.from(
    { length: 12 },
    (_, i) => ((currentMonth + i) % 12) + 1
  );

  return (
    <div className=" flex justify-center bg-white  mt-3">
      <div className="w-[450px] space-y-6 p-2 border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">
            How would you like to be paid?
          </h1>
          <p className="text-sm text-gray-500">
            Enter location and payment details
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Мongolia">Mongolia</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="Uk">UK</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Names */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Card Number */}
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter card number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Expiry and CVC */}
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="expiryMonth"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Expires</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {month.map((month, i) => (
                          <SelectItem key={i} value={month.toString()}>
                            {`${month} month`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expiryYear"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Year</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year, i) => (
                          <SelectItem key={i} value={year.toString()}>
                            {`${year} year`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="CVC" className="h-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gray-500 text-white py-2 rounded mt-6 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Please wait..." : "Save change"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}
