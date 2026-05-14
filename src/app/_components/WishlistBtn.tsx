"use client";
import { CiHeart } from "react-icons/ci";
import { useWishlist } from "../_context/WishlistContext";
import { addToWishlist, removeFromWishlist } from "../_action/wishlist.actions";
import { toast } from "sonner";
import { useState } from "react";

export default function WishlistBtn({ productId }: { productId: string }) {
  const { wishlistIds, setWishlistCount, setWishlistIds } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const isFav = wishlistIds.includes(productId);

  async function handleWishlist() {
    setIsLoading(true);
    try {
      if (isFav) {
        const res = await removeFromWishlist(productId);
        if (res.status === "success") {
          toast.success("Removed from wishlist");
          setWishlistCount(res.data.length);
          setWishlistIds(res.data);
        }
      } else {
        const res = await addToWishlist(productId);
        if (res.status === "success") {
          toast.success("Added to Wishlist ❤️");
          setWishlistCount(res.data.length);
          setWishlistIds(res.data);
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleWishlist}
      disabled={isLoading}
      className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 disabled:opacity-50"
      style={{
        borderColor: isFav ? "#16a34a" : "",
        color: isFav ? "#16a34a" : "",
      }}
    >
      <CiHeart size={20} className={isFav ? "fill-red-500 text-red-500" : ""} />
      {isFav ? "In Wishlist" : "Add to Wishlist"}
    </button>
  );
}