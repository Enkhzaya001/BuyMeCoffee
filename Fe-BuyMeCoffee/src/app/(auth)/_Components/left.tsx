"use client";

import Image from "next/image";
import { Coffee } from "lucide-react";

export const Left = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 text-center text-black">
      <header className="text-lg font-bold absolute top-6 left-8 flex items-center justify-center gap-2">
        <Coffee />
        Buy Me Coffee
      </header>

      {/* Centered content */}
      <div className="flex flex-col items-center space-y-6 mt-12">
        <Image
          src="/illustration.png"
          alt="Coffee Cup"
          width={240}
          height={240}
          className="rounded-full"
        />

        <h1 className="text-3xl font-bold leading-tight">
          Fund your creative work
        </h1>
        <h5 className="text-md max-w-sm text-gray-800">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </h5>
      </div>
    </div>
  );
};
