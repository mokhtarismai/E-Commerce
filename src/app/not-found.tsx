"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowLeft, FiHome } from "react-icons/fi"; // icons شيك
import { useRouter } from "next/navigation";
import { FaAppleWhole, FaCartShopping, FaSeedling } from "react-icons/fa6";

export default function NotFound() {
  const router = useRouter();

  const popularDestinations = [
    { name: "All Products", href: "/products", active: true },
    { name: "Categories", href: "/categories" },
    { name: "Today's Deals", href: "/deals" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-white via-green-50/50 to-white -z-10" />
      <div className=" absolute top-[10%] left-[5%] text-[#bbf7d0] text-4xl animate-pulse">
        <span className="text-4xl">
          <FaAppleWhole />
        </span>
      </div>
      <div className="absolute top-[50%] left-[15%] text-[#dcfce7] text-2xl  animate-pulse">
        {/* <Image src={appleBg} alt="bg" width={50} height={50} /> */}
        <span>
          <FaAppleWhole />
        </span>
      </div>
      <div className="absolute bottom-1/3 right-1/4  text-[#dcfce7] animate-pulse">
        <span className="text-3xl">
          <FaSeedling />
        </span>
      </div>

      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        <div className="relative mb-12">
          <div className="w-56 h-40 bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200 backdrop-blur-md flex items-center justify-center">
            <span className="text-7xl text-[#4ade80] opacity-60">
              <FaCartShopping />
            </span>
          </div>

          <div className="absolute -top-6 -right-6 w-20 h-20 bg-linear-to-br from-[#16a34a] to-[#16a34a] rounded-full flex items-center justify-center shadow-lg border-4 border-white backdrop-blur-lg">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              404
            </span>
          </div>
        </div>

        <div className="text-center max-w-xl mb-12">
          <h2 className="text-5xl font-extrabold text-[#112d40] tracking-tighter mb-4">
            Oops! Nothing Here
          </h2>
          <p className="text-lg text-[#5c6c75] font-medium leading-relaxed">
            Looks like this page went out of stock! Don't worry,
            <br />
            there's plenty more fresh content to explore.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <Link
            href="/"
            className=" bg-[#16a34a]  hover:bg-[#15803d] group w-full sm:w-auto inline-flex items-center justify-center gap-3  text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300  hover:-translate-y-1"
          >
            <FiHome className="text-lg" />
            Go to Homepage
          </Link>
          <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center gap-2.5 bg-white text-gray-800 px-8 py-3.5 rounded-full font-bold text-base border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md transition-all duration-300 group"
          >
            <FiArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        <div className="w-full max-w-4xl bg-white/60 p-5 rounded-[40px] border border-gray-100/70 shadow-sm backdrop-blur-sm">
          <div className="text-center mb-6">
            <h4 className="text-xs font-bold text-[#b4bdc2] tracking-widest uppercase">
              Popular Destinations
            </h4>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {popularDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={dest.href}
                className={`
                  px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300
                  ${
                    dest.active
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-[#f8f9fa] text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                  }
                `}
              >
                {dest.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
