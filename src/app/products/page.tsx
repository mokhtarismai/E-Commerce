import React from "react";
import ProductCard from "../_components/productCard";
import { getAllProducts } from "../../services/AllProduct";
import { getSingleBrand } from "../../services/getAllBrands"; // تأكد من المسار
import { GrDropbox } from "react-icons/gr";
import Link from "next/link";

// استقبال الـ searchParams كـ Promise (Next.js 15+)
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  // 1. استخراج الـ IDs من الرابط
  const { category, brand } = await searchParams;

  // 2. جلب المنتجات المفلترة (تأكد أن getAllProducts تستقبل category و brand)
  const products = await getAllProducts(category, brand);

  // 3. تحديد البيانات اللي هتظهر في البانر الأخضر
  let activeItem = null;

  if (brand) {
    // لو فيه براند، هنجيب بياناته من الـ API المخصص له
    activeItem = await getSingleBrand(brand);
  } else if (category && products && products.length > 0) {
    // لو مفيش براند وفيه كاتيجوري، هنجيب بيانات الكاتيجوري من أول منتج
    activeItem = products[0].category;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* 1. الـ Banner الأخضر (ديناميكي للبراند والكاتيجوري) */}
      <div className="bg-[#22c55e] text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumbs */}
          <nav className="text-sm mb-6 flex items-center gap-2 opacity-90">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:underline opacity-100">Products</Link>
            {activeItem && (
              <>
                <span>/</span>
                <span className="font-bold">{activeItem.name}</span>
              </>
            )}
          </nav>

          {/* محتوى الـ Banner */}
          <div className="flex items-center gap-6">
            {activeItem && (
              <div className="w-20 h-20 rounded-2xl bg-white p-2 shadow-lg overflow-hidden shrink-0 flex items-center justify-center">
                <img
                  src={activeItem.image}
                  alt={activeItem.name}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div>
              <h1 className="text-4xl font-bold tracking-tight capitalize">
                {activeItem ? activeItem.name : "All Products"}
              </h1>
              <p className="opacity-80 mt-2">
                {activeItem
                  ? `Browse our best products in ${activeItem.name}`
                  : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. الـ Products Grid */}
      <div className="container mx-auto px-4 py-8">
        {/* زرار لمسح الفلتر */}
        {(category || brand) && (
          <Link 
            href="/products" 
            className="inline-block mb-6 text-sm px-4 py-2 rounded-lg text-emerald-400  hover:text-emerald-600 transition-all font-medium"
          >
            ← Show All Products
          </Link>
        )}

        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-500 font-medium">
            Found <span className="text-emerald-600 font-bold">{products?.length || 0}</span> products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products?.map((product: any) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>

        {/* حالة عدم وجود منتجات */}
        {(!products || products.length === 0) && (
          <div className="text-center py-24   mt-10">
            <GrDropbox className="mx-auto text-gray-200 mb-4" size={50} />
            <p className="text-gray-500 text-lg font-medium mb-5">No products found in this selection.</p>
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#16a34a] text-white font-semibold hover:bg-[#15803d] transition-colors">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}