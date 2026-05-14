import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryType } from "../../types/product.type";
import { getAllCategories } from "../../services/getAllcategories";

// شيلنا "use client" وشيلنا الـ Hooks
export default async function ShopByCategory() {
  // بنجيب الداتا مباشرة بـ await لأننا في Server Component
  const categories: CategoryType[] = await getAllCategories();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-3xl font-bold text-[#21313c] flex gap-2 mb-3 md:mb-0">
              Shop By<span className="text-emerald-600">Category</span>
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-[#16a34a] hover:text-[#15803d] flex items-center gap-1 font-medium transition-colors"
          >
            View All Categories <ChevronRight size={18} />
          </Link>
        </div>

       
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories?.slice(0, 12).map(
            (
              cat, // لو عايز تحدد عدد معين في الرئيسية
            ) => (
              <Link
                key={cat._id}
                href={`/products?category=${cat._id}`}
                className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm transition-all duration-300 hover:shadow-lg "
              >
                <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-50   transition-all duration-500">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 96px, 120px"
                    className="object-cover "
                  />
                </div>

                <h3 className="text-[#21313c] font-medium text-sm md:text-base text-center ">
                  {cat.name}
                </h3>

               
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
