"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginschema, loginschemaDataType } from "./login.schema";
import Link from "next/link";
import coverimg from "../../assets/FreshCart-login.png";
import Image from "next/image";
import { Loader2 } from "lucide-react";

// Icons
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaShieldAlt } from "react-icons/fa";
import { Eye, Star, LockKeyhole } from "lucide-react";
import { FaClock, FaLock, FaTruck, FaUsers } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  // 1. تعريف الـ Form يكون في بداية الكومبوننت
  const form = useForm<loginschemaDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginschema),
  });

  // 2. فانكشن الـ Login المعدلة
  async function handleLogin(values: loginschemaDataType) {
    setIsLoading(true); // تشغيل اللودنج فوراً

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      setIsLoading(false); // إيقاف اللودنج عشان يصحح الخطأ
      toast.error("Invalid email or password", {
        position: "top-center",
        richColors: true,
      });
    } else {
      toast.success("Welcome Back!", {
        position: "top-center",
        richColors: true,
      });
      // بنسيب الـ Loading شغال لحد ما الـ router يخلص نقله للهوم
      router.push("/");
    }
  }

  return (
    <section className="min-h-screen bg-gray-50/30 flex items-center justify-center">
      {/* الـ Container الأساسي */}
      <div className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side: Branding & Image (Hidden on Mobile) */}
          <div className="hidden lg:flex flex-col items-center text-center space-y-8 bg-gray-50/50 h-full justify-center">
            <div className="w-full h-96 object-cover rounded-2xl shadow-lg overflow-hidden relative">
              <Image
                src={coverimg}
                alt="FreshCart Shopping"
                fill
                priority
                className="object-cover"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h1>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center gap-1.5 ">
                <FaTruck size={17} className="text-[#16a34a]" /> Free Delivery
              </div>
              <div className="flex items-center gap-1.5">
                <FaShieldAlt size={17} className="text-[#16a34a]" /> Secure
                Payment
              </div>
              <div className="flex items-center gap-1.5">
                <FaClock size={17} className="text-[#16a34a]" /> 24/7 Support
              </div>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#16a34a] mb-4">
                Fresh<span className="text-gray-800">Cart</span>
              </h2>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h3>
              <p className="text-gray-600">
                Sign in to continue your fresh shopping experience
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-7">
              <button className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-[#86efac] hover:bg-[#f0fdf4] transition-all duration-200">
                <FcGoogle size={20} /> Continue with Google
              </button>
              <button className="cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-[#86efac] hover:bg-[#f0fdf4] transition-all duration-200">
                <FaFacebook size={18} className="text-[#1877F2]" /> Continue
                with Facebook
              </button>
            </div>

            <div className="relative flex items-center justify-center mb-8 text-sm">
              <div className="border-t border-gray-100 w-full"></div>
              <span className="px-4 bg-white text-gray-500 font-medium absolute">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-6"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </FieldLabel>
                    <div className="relative">
                      <IoMdMail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        {...field}
                        placeholder="Enter your email"
                        className={`w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl h-14 bg-gray-50  focus:bg-white focus:ring-2 focus:ring-[#0aad0a]/20 focus:border-[#0aad0a] transition-all ${fieldState.invalid ? "border-red-500 bg-red-50" : ""}`}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-xs mt-1.5 ml-1"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="flex justify-between items-center mb-2 ml-1">
                      <FieldLabel className="block text-sm font-semibold text-gray-700 mb-2">
                        Password
                      </FieldLabel>
                      <Link
                        href="#"
                        className="text-sm text-[#16a34a] hover:text-[#16a34a]/80 cursor-pointer font-medium"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="relative">
                      <FaLock
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className={`w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl h-14 bg-gray-50  focus:bg-white focus:ring-2 focus:ring-[#0aad0a]/20 focus:border-[#0aad0a] transition-all ${fieldState.invalid ? "border-red-500 bg-red-50" : ""}`}
                      />
                      <Eye
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 cursor-pointer hover:text-gray-600"
                        size={18}
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-xs mt-1.5 ml-1"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              <div className="flex items-center gap-2 ml-1">
                <input
                  type="checkbox"
                  id="keep"
                  className="h-4 w-4 text-[#16a34a] accent-[#16a34a] border-2 border-gray-300 rounded focus:ring-[#22c55e]"
                />
                <label htmlFor="keep" className="ml-2 text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full h-14 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-green-200/50 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Signing In...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  New to FreshCart?{" "}
                  <Link
                    href="/signup"
                    className="text-[#16a34a] hover:text-[#15803d] font-semibold cursor-pointer"
                  >
                    Create an account
                  </Link>
                </p>

                <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <LockKeyhole size={12} /> SSL Secured
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaUsers size={12} /> 50K+ Users
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star size={12} fill="currentColor" /> 4.9/5
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
