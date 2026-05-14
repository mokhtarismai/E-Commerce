"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { deleteItemAction, getUserCart } from "../_action/card.actions";
import { CartItemType } from "@/types/cart.type";
import { updateCartCountAction } from "../_action/card.actions";
import { clearCartAction } from "../_action/card.actions";
import { toast } from "sonner";

interface CartContextType {
  cartCount: number;
  setCartCount: (count: number) => void;
  totalPriceOfCart: number;
  setTotalPriceOfCart: (price: number) => void;
  CartProduct: CartItemType[] | null; 
  setCartProduct: React.Dispatch<React.SetStateAction<CartItemType[] | null>>;
  cartId: string;
  deleteItem: (id: string) => Promise<any>;
  updateCartCount: (id: string, count: number) => Promise<any>;
  clearCart: (cartId?: string) => Promise<any>;
  isCartLoading: boolean;
}

// 2. إنشاء الـ Context (القيمة الافتراضية null هي الأصح والأسهل)
export const CartContext = createContext<CartContextType | null>(null);

export default function ContextCart({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [totalPriceOfCart, setTotalPriceOfCart] = useState(0);
  const [CartProduct, setCartProduct] = useState<CartItemType[] | null>(null);
  const [cartId, setCartId] = useState("");
  const [isCartLoading, setIsCartLoading] = useState(true);

  // دالة تحديث الـ states - بطلنا نكرر الكود
  function updateStates(apiResponse: any) {
    if (apiResponse) {
      setCartCount(apiResponse.numOfCartItems || 0);
      setTotalPriceOfCart(apiResponse.data?.totalCartPrice || 0);
      setCartProduct(apiResponse.data?.products || []);
      setCartId(apiResponse.data?._id || "");
    }
  }

  async function getDataFromAPI() {
    try {
      setIsCartLoading(true);

      const userCart = await getUserCart();

      updateStates(userCart);

      return userCart;
    } catch (error) {
      console.error("فشل في جلب بيانات العربة:", error);
      setCartProduct([]);
    } finally {
      setIsCartLoading(false);
    }
  }

  async function deleteItem(productId: string) {
    try {
      const data = await deleteItemAction(productId);

      if (data && "status" in data && data.status === "success") {
        updateStates(data);
        toast.success(data.message || "تم حذف المنتج من العربة");
      } else {
        const errorMsg = (data as any).message || "حدث خطأ أثناء الحذف";
        throw new Error(errorMsg);
      }
      return data;
    } catch (error) {
      console.error("خطأ في الحذف:", error);
      throw error;
    }
  }
  async function updateCartCount(productId: string, count: number) {
    try {
      const data = await updateCartCountAction(productId, count);

      if (data && data.status === "success") {
        // بنستخدم نفس الدالة اللي بتحدث الـ states كلها (السعر، العدد، المنتجات)
        updateStates(data);
        return data;
      }
    } catch (error) {
      console.error("Context Update Error:", error);
    }
  }
async function clearCart() {
  try {
    const data = await clearCartAction();

    if (data && data.message === "success") {
      // ✅ امسح الـ state manually بدل getDataFromAPI
      // عشان getDataFromAPI ممكن ترجع بيانات قديمة لو الـ cache لسه مش اتحدث
      setCartCount(0);
      setTotalPriceOfCart(0);
      setCartProduct([]);
      setCartId("");
      return true;
    }

    return false;
  } catch (error) {
    console.error("Context Clear Error:", error);
    return false;
  }
}
  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        totalPriceOfCart,
        setTotalPriceOfCart,
        CartProduct,
        cartId,
        setCartProduct,
        deleteItem,
        updateCartCount,
        clearCart,
        isCartLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
