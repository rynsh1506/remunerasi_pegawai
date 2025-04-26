"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/app/store/useAuthStore";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!formData.email && !formData.password) {
      return toast.error("Please fill in both your email and password.");
    } else if (!formData.email) {
      return toast.error("Please fill in your email.");
    } else if (!formData.password) {
      return toast.error("Please fill in your password.");
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === true) login(formData);
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 z-2 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type="email"
            className="input input-bordered w-full pl-10"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 z-2 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-base-content/40" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            className="input input-bordered w-full px-10"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 z-2 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-base-content/40" />
            ) : (
              <Eye className="h-5 w-5 text-base-content/40" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isLoggingIn}
      >
        {isLoggingIn ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
