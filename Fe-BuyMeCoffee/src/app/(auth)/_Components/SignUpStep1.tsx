"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dispatch } from "react";
import { Input } from "@/components/ui/input";

export type StepProps = {
  handleNext: () => void;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  username: string;
};

export const SignUpStep1 = ({
  handleNext,
  setUsername,
  username,
}: StepProps) => {
  const formSchema = z.object({
    username: z.string({ required_error: "User name is must" }).min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const isValueValid = !form.watch("username");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setUsername(values.username);
    handleNext();
    console.log("hello");
  };
  return (
    <div className="flex h-screen p-8 justify-center items-center">
      <Form {...form}>
        <form
          className="p-2 w-[400px] h-[256px] justify-between items-center m-auto"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="flex py-2 flex-col">
            <span className="text-2xl font-semibold">Create your account</span>
            <p className="text-md text-gray-500">Create your account</p>
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="py-2 text-xl">Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={isValueValid}
            type="submit"
            className="w-full bg-gray-300 text-white mt-10"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
};
