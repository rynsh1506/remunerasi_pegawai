"use client";

import { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
  });

  const { signup, isSigningUp, authUser } = useAuthStore();

  const validateForm = () => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (!uppercaseRegex.test(formData.password))
      return toast.error(
        "Password must contain at least one uppercase letter."
      );
    if (!lowercaseRegex.test(formData.password))
      return toast.error(
        "Password must contain at least one lowercase letter."
      );
    if (!numberRegex.test(formData.password))
      return toast.error("Password must contain at least one number.");
    if (!specialCharRegex.test(formData.password))
      return toast.error(
        "Password must contain at least one special character."
      );

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) {
      await signup(formData);
      if (authUser) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      {/* fullname */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Full Name</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 z-2 flex items-center pointer-events-none">
            <User className="size-5 text-base-content/40" />
          </div>
          <input
            type="text"
            className="input input-bordered w-full pl-10"
            placeholder="John Doe"
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
          />
        </div>
      </div>

      {/* email */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 z-2 flex items-center pointer-events-none">
            <Mail className="size-5 text-base-content/40" />
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

      {/* password */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 z-2 flex items-center pointer-events-none">
            <Lock className="size-5 text-base-content/40" />
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
            className="absolute inset-y-0 right-0 pr-3 z-2 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="size-5 text-base-content/40" />
            ) : (
              <Eye className="size-5 text-base-content/40" />
            )}
          </button>
        </div>
      </div>

      {/* submit button */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSigningUp}
      >
        {isSigningUp ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
