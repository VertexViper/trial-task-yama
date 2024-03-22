"use client";
import dynamic from "next/dynamic";
import Loader from "@/components/ui/loader";


const SignInForm = dynamic(() => import("@/components/auth/signin"), {
  loading: () => <Loader />,
});

const SignIn = () => {
  return (
    <div className="z-1002 flex items-center justify-center h-screen bg-gray-950">
      <SignInForm />
    </div>
  );
}

export default SignIn
