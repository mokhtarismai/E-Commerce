"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im"; // اختيارية للـ loading
import { toast } from "sonner";
import { removeFromWishlist } from "../_action/wishlist.actions";
import { useWishlist } from "../_context/WishlistContext";

export default function RemoveFromWishListBtn({
  productId,
  onSuccess,
}: {
  productId: string;
  onSuccess?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { setWishlistCount, setWishlistIds } = useWishlist();

  async function handleRemoveFromWishlist() {
    setIsLoading(true);
    try {
      const res = await removeFromWishlist(productId);

      // تأكد من أن الـ action يرجع استجابة ناجحة
      if (res.status === "success") {
        toast.success("Item removed from wishlist");
        setWishlistCount(res.data.length);
        setWishlistIds(res.data); // ✅ أضف السطر ده
        onSuccess?.();
      } else {
        toast.error(res.message || "Could not remove item");
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleRemoveFromWishlist}
      disabled={isLoading}
      variant="ghost" // استخدام variant جاهز من shadcn لو متاح
      className="p-2 h-auto cursor-pointer bg-transparent text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
    >
      {isLoading ? (
        <ImSpinner2 className="animate-spin" size={18} />
      ) : (
        <BsTrash size={18} />
      )}
    </Button>
  );
}
