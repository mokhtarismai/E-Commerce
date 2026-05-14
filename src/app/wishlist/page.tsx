"use client";
import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { getWishlist } from "../_action/wishlist.actions";
import EmptyWishlist from "../_components/EmptyWishlist";
import RemoveFromWishListBtn from "../_components/removeFromWishListBtn";
import AddToCartBtn from "../_components/ButtunWishlist";

export default function WishlistPage() {
  const [wishlistData, setWishlistData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // جلب البيانات أول مرة
  useEffect(() => {
    async function fetchWishlist() {
      const data = await getWishlist();
      setWishlistData(data);
      setLoading(false);
    }
    fetchWishlist();
  }, []);

  // دالة المسح الفوري من الـ UI
  const handleRemoveSuccess = (productId: string) => {
    setWishlistData((prev: any) => ({
      ...prev,
      count: prev.count - 1,
      data: prev.data.filter((item: any) => item.id !== productId),
    }));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!wishlistData || wishlistData.count === 0) return <EmptyWishlist />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-6">
        {/* ... الهيدر والـ Breadcrumb زي ما هما ... */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-red-50 p-3 rounded-xl">
            <Heart className="text-red-500 fill-red-500" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 text-sm">
              {wishlistData.count} items saved
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {wishlistData.data.map((product: any) => (
                <tr
                  key={product.id}
                  className="group hover:bg-gray-50/30 transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg border border-gray-100 relative overflow-hidden">
                        <Image
                          fill
                          src={product.imageCover}
                          alt={product.title}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`product/${product.id}`}
                          className="text-sm font-medium text-gray-900 hover:text-green-600 transition-colors"
                        >
                          {product.title.split(" ").slice(0, 3).join(" ")}
                        </Link>
                        <p className="text-xs text-gray-400 mt-1">
                          {product.category.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-gray-900">
                      {product.priceAfterDiscount || product.price} EGP
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <Badge className="bg-green-50 text-green-600 border-none">
                      In Stock
                    </Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <AddToCartBtn productId={product.id} />
                      {/* هنا بنمرر دالة الحذف للزرار */}
                      <RemoveFromWishListBtn
                        productId={product.id}
                        onSuccess={() => handleRemoveSuccess(product.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* ... باقي الكود ... */}
      </div>
    </div>
  );
}
