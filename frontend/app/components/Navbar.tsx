"use client";

import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useRouter } from "next/navigation";
import { LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
  }, []);

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 px-6">
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold">
          App Name
        </Link>
      </div>
      <div className="flex-none gap-2">
        <Link href="/my-tasks" className="btn btn-ghost">
          My Tasks
        </Link>
        <Link href="/tasks" className="btn btn-ghost">
          Tasks
        </Link>
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-square"
          aria-label="Toggle Theme"
        >
          {theme === "light" ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </button>
        {authUser && (
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-square"
            aria-label="Logout"
          >
            <LogOut className="size-5" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
