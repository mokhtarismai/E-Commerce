import Link from "next/link";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function PromoBanners() {
  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto ">
        <div className="grid  md:grid-cols-2 gap-6">
          {/* Banner 1: Fresh Organic Fruits */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white">
            {/* الدواير اللي في الخلفية (نفس الصورة) */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                🔥 Deal of the Day
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Fresh Organic Fruits
              </h3>
              <p className="text-white/80 mb-4">
                Get up to 40% off on selected organic fruits
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">40% OFF</span>
                <div className="text-sm text-white/70">
                  Use code:
                  <span className="font-bold text-white"> ORGANIC40</span>
                </div>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors w-fit"
              >
                Shop Now <FaArrowRightLong size={18} />
              </Link>
            </div>
          </div>

          {/* Banner 2: Exotic Vegetables */}
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white">
            {/* الدواير اللي في الخلفية (نفس الصورة) */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
                ✨ New Arrivals
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Exotic Vegetables
              </h3>
              <p className="text-white/80 mb-4">
                Discover our latest collection of premium vegetables
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">25% OFF</span>
                <div className="text-sm text-white/70">
                  Use code:
                  <span className="font-bold text-white"> FRESH25</span>
                </div>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-orange-500 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors w-fit"
              >
                Explore Now <FaArrowRightLong size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
