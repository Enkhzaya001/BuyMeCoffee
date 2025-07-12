"use client";

import { useState } from "react";
import { SignUpStep1 } from "../_Components/SignUpStep1";
import { SignUpStep2 } from "../_Components/SignUpStep2";
import router, { useRouter } from "next/navigation";

const stepperArrey = [SignUpStep1, SignUpStep2];

const SignUp = () => {
  const [count, setCount] = useState<number>(0);
  const [username, setUsername] = useState<string>("");

  const router = useRouter();
  const Stepper = stepperArrey[count];

  const handleNext = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <Stepper
      handleNext={handleNext}
      setUsername={setUsername}
      username={username}
    />
  );
};

export default SignUp;
