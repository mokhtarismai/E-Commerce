import { getAllCategories } from "@/services/getAllcategories";
import { CategoryType } from "@/types/product.type";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { FaLayerGroup } from "react-icons/fa6";

export default async function categoriesPage() {
  const categories: CategoryType[] = await getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 1. الـ Banner الأخضر (Static Part) */}
      <div className="bg-linear-to-br from-[#16a34a] via-[#22c55e] to-[#4ade80] text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <nav className="text-sm mb-6 font-medium flex items-center gap-2 text-gray-300">
            <Link
              href="/"
              className="hover:text-white transition-all opacity-80 hover:opacity-100"
            >
              Home
            </Link>
            <span className="opacity-50 select-none">/</span>
            <span className="text-white font-semibold">Categories</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaLayerGroup className=" text-white" size={35} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. قسم عرض الكاتيجوري (Grid Layout) */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories?.map((category) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`} // افترضت وجود slug للتوجيه
              className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
            >
              {/* حاوية الصورة */}
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* اسم الكاتيجوري */}
              <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
