"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { JSX, useEffect } from "react";
import React from "react";

export default function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: P) {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    useEffect(() => {
      if (!isCheckingAuth && !authUser) {
        router.replace("/login");
      }
    }, [isCheckingAuth, authUser, router]);

    if (isCheckingAuth)
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="size-10 animate-spin" />
        </div>
      );

    return <WrappedComponent {...props} />;
  };
}
