"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/loader";


const SignUpForm = dynamic(() => import("@/components/auth/signup"), {
  loading: () => <Loader />,
});

const SignUp = () => {
  return (
    <div className="z-1002 flex items-center justify-center h-screen bg-gray-950">
      <SignUpForm />
    </div>
  );
}

export default SignUp
