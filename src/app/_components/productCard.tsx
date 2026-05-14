"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiEye } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { ProductType } from "../../types/product.type";
import AddToCardBtn from "./AddToCardBtn";
import { useWishlist } from "../_context/WishlistContext"; // تأكد من المسار
import { addToWishlist } from "../_action/wishlist.actions";
import { toast } from "sonner";
import { removeFromWishlist } from "../_action/wishlist.actions";

const ProductCard = ({ item }: { item: ProductType }) => {
  const { wishlistIds, setWishlistCount, setWishlistIds } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  // نتحقق إذا كان المنتج موجود فعلاً في المفضلة
  const isFav = wishlistIds.includes(item.id);

  async function handleWishlist() {
    setIsLoading(true);
    try {
      if (isFav) {
        // ✅ لو موجود → امسحه
        const res = await removeFromWishlist(item.id);
        if (res.status === "success") {
          toast.success("Removed from wishlist");
          setWishlistCount(res.data.length);
          setWishlistIds(res.data);
        }
      } else {
        // ✅ لو مش موجود → ضيفه
        const res = await addToWishlist(item.id);
        if (res.status === "success") {
          toast.success(res.message || "Added to Wishlist ❤️");
          setWishlistCount(res.data.length);
          setWishlistIds(res.data);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
      {item.priceAfterDiscount && (
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded absolute top-3 left-3 z-20">
          {Math.round(
            ((item.price - item.priceAfterDiscount) / item.price) * 100,
          )}
          %
        </span>
      )}

      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <button
          className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm cursor-pointer"
          onClick={handleWishlist}
          disabled={isLoading}
        >
          <FiHeart
            size={16}
            className={
              isFav
                ? "text-red-500 fill-red-500"
                : "text-gray-600 hover:text-red-500"
            }
          />
        </button>
        <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#16a34a] shadow-sm cursor-pointer">
          <FaArrowsRotate size={16} />
        </button>
        <Link
          href={`/product/${item.id}`}
          className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-[#16a34a] shadow-sm cursor-pointer transition-all duration-200 hover:scale-110"
        >
          <FiEye size={16} />
        </Link>
      </div>

      <div className="relative w-full h-48 mb-4 overflow-hidden">
        <Image
          src={item.imageCover}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>

      <div className="flex flex-col grow">
        <p className="text-[11px] text-gray-400 mb-1">{item.category?.name}</p>
        <Link href={`/product/${item.id}`}>
          <h3 className="font-medium mb-1 cursor-pointer ">{item.title}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-yellow-400 text-base">
            {[...Array(5)].map((_, i) =>
              i < Math.floor(item.ratingsAverage || 0) ? (
                <FaStar key={i} />
              ) : (
                <FaRegStar key={i} className="text-gray-300" />
              ),
            )}
          </div>

          <span className="text-xs text-gray-500">{item.ratingsAverage}</span>

          <span className="text-xs text-gray-500">
            ({item.ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-end">
            <span
              className={`text-lg font-bold ${item.priceAfterDiscount ? "text-[#16a34a]" : "text-gray-800"}`}
            >
              {item.priceAfterDiscount ? item.priceAfterDiscount : item.price}{" "}
              EGP
            </span>

            {item.priceAfterDiscount && (
              <span className="text-sm text-gray-500 line-through ml-2 mb-0.5">
                {item.price} EGP
              </span>
            )}
          </div>

          <AddToCardBtn productId={item.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
