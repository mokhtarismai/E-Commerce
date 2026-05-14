"use client";
import React, { useContext, useTransition } from "react";
import { IoMdAdd } from "react-icons/io";
import { addCardToCart } from "../_action/card.actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CartContext } from "../_context/ContextCart";

interface AddToCardBtnProps {
  productId: string;
}

export default function AddToCardBtn({ productId }: AddToCardBtnProps) {
  const context = useContext(CartContext);
  
  const [isPending, startTransition] = useTransition();

  function handleAddToCart() {
    // التحقق من وجود الـ Context قبل العمل
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
          setTotalPriceOfCart(result.data.totalCartPrice); // تأكد من اسم الحقل من الـ API
          setCartProduct(result.data.products); // تحديث مصفوفة المنتجات لتعمل خاصية .length بنجاح
        } else {
          toast.error(result?.message || "Please login first to add to cart");
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
      className="h-10 w-10 rounded-full flex items-center justify-center transition bg-[#16a34a] text-white hover:bg-[#15803d] disabled:opacity-70 cursor-pointer shadow-sm active:scale-95 group"
      title="Add to cart"
    >
      {isPending ? (
        <Loader2 className="animate-spin" size={18} />
      ) : (
        <IoMdAdd size={20} className="group-hover:scale-125 transition-transform" />
      )}
    </button>
  );
}