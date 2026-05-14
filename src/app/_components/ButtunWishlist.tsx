"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "sonner";
import { CartContext } from "../_context/ContextCart";
import { addCardToCart } from "../_action/card.actions";

export default function AddToCartBtn({ productId }: { productId: string }) {
  // نأخذ الـ Context بالكامل
  const context = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart() {
    if (!context) return; // تأمين لو الـ Context مش شغال

    setIsLoading(true);

    try {
      const res = await addCardToCart(productId);

      if (res.status === "success") {
        toast.success(res.message || "Added successfully! 🛒");


        context.setCartCount(res.numOfCartItems || 0);
        if (res.data) {
          context.setTotalPriceOfCart(res.data.totalCartPrice);
          context.setCartProduct(res.data.products);
        }
      } else {
        toast.error(res.message || "Please login first");
      }
    } catch (error) {
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="h-auto cursor-pointer flex items-center gap-2 bg-[#1a8a47] hover:bg-[#156e39] text-white px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <>
          <ImSpinner2 className="animate-spin" size={14} />
          <span>Adding...</span>
        </>
      ) : (
        <>
          <FaShoppingCart size={14} />
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  );
}
