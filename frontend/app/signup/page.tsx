"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";
import AuthImagePattern from "@/app/components/AuthImagePattern";
import SignUpForm from "@/app/components/SignUpForm";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import withGuestOnly from "../components/withGuestOnly";

const SignUpPage = () => {
  const router = useRouter();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>

          <SignUpForm />

          {/* link to login */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an account?{" "}
              <Link href="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}
      <AuthImagePattern
        title="Track Your Work & Earnings"
        subtitle="Easily record your tasks, track working hours, and calculate your remuneration in one place."
      />
    </div>
  );
};

export default withGuestOnly(SignUpPage);
