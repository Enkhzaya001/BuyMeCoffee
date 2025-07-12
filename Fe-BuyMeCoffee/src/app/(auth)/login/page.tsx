"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginStep } from "../_Components/LoginStep1";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <LoginStep />
    </div>
  );
};
export default Login;
