"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";
import LoginForm from "@/app/components/LoginForm";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withGuestOnly from "../components/withGuestOnly";

function LoginPage() {
  const router = useRouter();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  return (
    <div className="h-screen grid lg:grid-cols-2">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <LoginForm />

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Placeholder */}
      <div className="hidden lg:flex items-center justify-center bg-base-200">
        <h2 className="text-3xl font-bold">Welcome back!</h2>
      </div>
    </div>
  );
}

export default withGuestOnly(LoginPage);
