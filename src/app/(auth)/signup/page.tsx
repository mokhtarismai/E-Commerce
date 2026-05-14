"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { sginupSchema, sginupschemaDataType } from "./sginup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import auther from "../../assets/review-author.webp"
// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaShieldAlt } from "react-icons/fa";
import { CheckCircle2, Star, Truck, ShieldCheck, UserPlus } from "lucide-react";
import { FaStar, FaTruckFast, FaUserPlus } from "react-icons/fa6";

export default function SignupPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(sginupSchema),
  });

  async function handleSginUp(values: sginupschemaDataType) {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (res.ok) {
      toast.success("Signed up successfully!", {
        position: "top-center",
        richColors: true,
      });
      router.push("/login");
    } else {
      toast.error("Error in signing up", {
        position: "top-center",
        richColors: true,
      });
    }
  }

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-10">
      <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
        {/* Left Side: Features & Testimonial */}
        <div className="hidden lg:flex flex-col  ">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to <span className="text-[#16a34a]">FreshCart</span>
            </h1>
            <p className="text-xl mt-2 mb-4">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>
          </div>

          <div className="*:flex *:items-start *:gap-4 space-y-6 my-8">
            {/* Item 1: Premium Quality */}
            <div className="flex gap-4">
              <div className="bg-[#bbf7d0] w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-100">
                <FaStar className="text-[#16a34a] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Premium Quality</h3>
                <p className="text-gray-600">
                  Premium quality products sourced from trusted suppliers.
                </p>
              </div>
            </div>

            {/* Item 2: Fast Delivery */}
            <div className="flex gap-4">
              <div className="bg-[#bbf7d0] w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-100">
                <FaTruckFast className="text-[#16a34a] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Fast Delivery</h3>
                <p className="text-gray-600">
                  Same-day delivery available in most areas
                </p>
              </div>
            </div>

            {/* Item 3: Secure Shopping */}
            <div className="flex gap-4">
              <div className="bg-[#bbf7d0] w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-100">
                <FaShieldAlt className="text-[#16a34a] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Secure Shopping</h3>
                <p className="text-gray-600">
                  Your data and payments are completely secure
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="review bg-white shadow-sm p-4 rounded-md">
            <div className="author flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={auther.src}
                  alt="User"
                />
              </div>
              <div>
                <h4 className="">Sarah Johnson</h4>
                <div className="rating *:text-yellow-300 flex items-center  gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={17} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <p className="italic text-gray-600">
              "FreshCart has transformed my shopping experience. The quality of
              the products is outstanding, and the delivery is always on time.
              Highly recommend!"
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
          <div className="text-center mb-10">
            <h2 className="text-center text-3xl font-semibold mb-2">
              Create Your Account
            </h2>
            <p className="">
              Start your fresh journey with us today
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-2 mb-10">
            <button className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-100 transition-all font-medium text-sm">
              <FcGoogle size={20} /> Google
            </button>
            <button className="cursor-pointer flex items-center justify-center gap-2 border border-gray-200 py-2.5 rounded-xl hover:bg-gray-100 transition-all font-medium text-sm">
              <FaFacebook size={20} className="text-[#1877F2]" /> Facebook
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <div className="border-t border-gray-200 w-full"></div>
            <span className="absolute bg-white px-4">
              or
            </span>
          </div>

          <form
            onSubmit={form.handleSubmit(handleSginUp)}
            className="space-y-5"
          >
            {/* Name Field */}
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-gray-700 font-semibold  block text-md">
                    Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="Ali"
                    className={`rounded-lg h-11 border-gray-200 focus:ring-[#0aad0a] focus:border-[#0aad0a] ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Email Field */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-gray-700 font-semibold block">
                    Email*
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="ali@example.com"
                    className={`rounded-lg h-11 border-gray-200 focus:ring-[#0aad0a] focus:border-[#0aad0a] ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Password Field */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-gray-700 font-semibold block text-md">
                    Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="create a strong password"
                    className={`rounded-lg h-11 border-gray-200 focus:ring-[#0aad0a] focus:border-[#0aad0a] ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {/* Strength Bar Placeholder */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-300 w-3/4"></div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Weak
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    Must be at least 8 characters with numbers and symbols
                  </p>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password Field */}
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-gray-700 font-semibold block text-md"> 
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="confirm your password"
                    className={`rounded-lg h-11 border-gray-200 focus:ring-[#0aad0a] focus:border-[#0aad0a] ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Phone Field */}
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-gray-700 font-semibold block text-md">
                    Phone Number*
                  </FieldLabel>
                  <Input
                    {...field}
                    placeholder="+1 234 567 8900"
                    className={`rounded-lg h-11 border-gray-200 focus:ring-[#0aad0a] focus:border-[#0aad0a] ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs mt-1"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="size-4 accent-[#16a34a]"
                required
              />
              <p className="ms-2">
                I agree to the{" "}
                <Link href="#" className="text-[#16a34a] hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-[#16a34a] hover:underline">
                  Privacy Policy
                </Link>{" "}
                *
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-xl font-bold text-base transition-all flex gap-2 cursor-pointer"
            >
              <FaUserPlus size={20} /> Create My Account
            </Button>

            <div className="border-t pt-10 border-gray-300/30 my-4 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#16a34a] font-bold hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Sub-component for features
function FeatureItem({
  icon,
  title,
  desc,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bgColor: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-100`}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
