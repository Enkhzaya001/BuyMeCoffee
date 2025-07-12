import Image from "next/image";
import { Left } from "./(auth)/_Components/left";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="bg-yellow-500 w-1/2">
        <Left />
      </div>
      <div className="flex justify-center items-center min-h-screen flex-1/2 bg-gradient-to-br from-amber-200 to-yellow-100 px-4">
        <div className="bg-white border border-amber-300 shadow-lg rounded-xl p-8 w-full max-w-md text-center space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to <span className="text-amber-500">My Me Coffee</span>
            ☕🔥😎
          </h1>
          <p className="text-sm text-gray-500">
            Start your journey by logging in or signing up!
          </p>
          <div className="flex justify-center gap-4">
            <Link href={"/login"}>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-md shadow">
                Log in
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button className="bg-white border border-amber-500 text-amber-600 hover:bg-amber-100 px-6 py-2 rounded-md shadow">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
