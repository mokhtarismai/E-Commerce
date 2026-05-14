import Link from "next/link";
import React from "react";
import { FaTags } from "react-icons/fa";
import Image from "next/image";
import { getBrands } from "@/services/getAllBrands"; // تأكد من اسم الفانكشن اللي بتجيب الكل

export default async function BrandsPage() {
  // هنا بنجيب كل الماركات عشان نعرضها في الشبكة (Grid)
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* الـ Header الملون */}
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="text-sm mb-6 font-medium flex items-center gap-2 text-violet-100">
            <Link href="/" className="hover:text-white transition-all opacity-80 hover:opacity-100">
              Home
            </Link>
            <span className="opacity-50 select-none">/</span>
            <span className="text-white font-semibold">Brands</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaTags className="text-white" size={30} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Top Brands</h1>
              <p className="text-violet-100 mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* عرض الـ Brands Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands?.map((brand: any) => (
            <Link
              key={brand._id}
              // لما يدوس هنا، هيروح لصفحة المنتجات ومعاه الـ ID بتاع البراند
              href={`/products?brand=${brand._id}`}
              className="group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-violet-200"
            >
              <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-gray-700 font-bold text-sm md:text-base text-center group-hover:text-violet-600 transition-colors">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}