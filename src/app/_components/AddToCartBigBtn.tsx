"use client";
import React, { useContext, useTransition } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { addCardToCart } from "../_action/card.actions"; // اتأكد من المسار
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CartContext } from "../_context/ContextCart"; // اتأكد من المسار

interface Props {
  productId: string;
  quantity?: number;
}

export default function AddToCartBigBtn({ productId }: Props) {
  const context = useContext(CartContext);
  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    if (!context) {
      toast.error("Cart system is not ready");
      return;
    }

    const { setCartCount, setTotalPriceOfCart, setCartProduct } = context;

    startTransition(async () => {
      try {
        const result = await addCardToCart(productId);

        if (result?.success) {
          toast.success(result.message || "Added to cart successfully!");
          setCartCount(result.numOfCartItems);
          setTotalPriceOfCart(result.data.totalCartPrice);
          setCartProduct(result.data.products);
        } else {
          toast.error(result?.message || "Please login first");
        }
      } catch (error) {
        toast.error("Failed to connect to server");
      }
    });
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isPending}
      className="bg-[#16a34a] text-white py-3.5 px-6 rounded-xl font-medium hover:bg-[#15803d] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#16a34a40] disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={20} />
      ) : (
        <FaShoppingCart />
      )}
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}