import { getProductById } from "@/services/AllProduct";
import React from "react";
// استيراد الكومبوننت الجديد - تأكد من المسار صح حسب مشروعك
import ProductImages from "../../_components/ProductImages";
import { CiHeart } from "react-icons/ci";
import {
  FaStar,
  FaShoppingCart,
  FaBolt,
  FaShareAlt,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FiTruck, FiRotateCcw, FiShield } from "react-icons/fi";
import ProductDetailsTabs from "@/app/_components/ProductDetailsTabs";
import RelatedProducts from "@/app/_components/RelatedProducts";
import Link from "next/link";
import AddToCartBigBtn from "@/app/_components/AddToCartBigBtn";
import ProductQuantity from "@/app/_components/ProductQuantity";
import WishlistBtn from "@/app/_components/WishlistBtn";

export default async function ProductData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // تجميع كل الصور في مصفوفة واحدة للـ Carousel
  const allImages = [product.imageCover, ...(product.images || [])];

  return (
    <div className="min-h-screen pb-8 pt-5 font-sans bg-white">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link
            href={"/"}
            className="hover:text-emerald-600 cursor-pointer transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">
            {product.category?.name}
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium truncate">
            {product.title}
          </span>
        </nav>

        {/* الكارت الرئيسي للمنتج */}
        <div className="bg-white overflow-hidden p-6 lg:p-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* الجزء الأيسر: دلوقتي هنستخدم الكومبوننت الكلينت هنا */}
            <div className="lg:col-span-3 sticky top-10">
              <ProductImages
                images={allImages}
                title={product.title}
                priceAfterDiscount={product.priceAfterDiscount}
              />
            </div>

            {/* الجزء الأيمن: تفاصيل المنتج (زي ما هي سيرفر) */}
            <div className="lg:col-span-9 space-y-7 bg-white rounded-xl shadow-sm p-6 border border-gray-50">
              {/* التصنيف والماركة */}
              <div className="flex gap-2">
                <span className="bg-[#f0fdf4] text-[#15803d] text-xs px-3 py-1.5 rounded-full hover:bg-[#dcfce7] transition font-medium">
                  {product.category?.name}
                </span>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">
                  {product.brand?.name || "DeFacto"}
                </span>
              </div>
              {/* العنوان والتقييم */}
              <div className="space-y-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {product.title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <FaStar size={16} />
                    <span className="text-sm text-gray-600">
                      {product.ratingsAverage}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({product.ratingsQuantity} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2 border-l pl-4">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-emerald-600 text-xs font-bold uppercase tracking-tight">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>
              {/* السعر */}
              <div className="py-4 border-y border-gray-50">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {product.price}
                  </span>
                  <span className="text-3xl font-bold text-gray-900 font-sans ml-1">
                    EGP
                  </span>
                </div>
              </div>
              {/* الوصف */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <ProductQuantity
                productId={product.id}
                stock={product.quantity}
                price={product.price}
              />
              {/* Wishlist & Share */}
             
              <div className="flex items-center gap-3">
                <WishlistBtn productId={product.id} />
                <button className="w-14 h-14 flex items-center justify-center border-2 border-gray-100 rounded-2xl text-gray-400 hover:bg-gray-50 transition-all">
                  <FaShareAlt />
                </button>
              </div>
              {/* سكشن الـ Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                {[
                  {
                    icon: <FiTruck />,
                    label: "Free Delivery",
                    sub: "Orders over 500",
                  },
                  {
                    icon: <FiRotateCcw />,
                    label: "30 Days Return",
                    sub: "Money back",
                  },
                  {
                    icon: <FiShield />,
                    label: "Secure Payment",
                    sub: "100% Protected",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-[#dcfce7] text-[#16a34a] rounded-full flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div className="leading-tight">
                      <p className="font-medium text-gray-900 text-sm">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ProductDetailsTabs product={product} />
        </div>
        <RelatedProducts
          categoryId={product.category._id}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
