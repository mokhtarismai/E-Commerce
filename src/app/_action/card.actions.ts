"use server";

import { CartResType } from "@/types/cart.type";
import { myToken } from "@/utils/myToken";
import { revalidateTag } from "next/cache";

export async function addCardToCart(
  productId: string,
): Promise<Partial<CartResType> & { success: boolean }> {
  try {
    const token = await myToken();

    if (!token) {
      return { success: false, message: "Please login first" };
    }

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token as string,
      },
      body: JSON.stringify({ productId }),
      
    });

    const finalRes: CartResType = await res.json();

    if (res.ok) {
      revalidateTag("cart-data");
      revalidateTag("cart");
      return {
        success: true,
        ...finalRes, // بنفك بيانات الـ API الموضحة في الصورة هنا
      };
    } else {
      return {
        success: false,
        status: finalRes.status,
        message: finalRes.message || "Failed to add to cart",
      };
    }
  } catch (error) {
    console.error("Cart Error:", error);
    return { success: false, message: "Server Error" };
  }
}

export async function getUserCart(): Promise<CartResType> {
  const token = await myToken();
  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    headers: {
      token: token as string,
    },
  });

  const finalres = await res.json();
  return finalres;
}
export async function deleteItemAction(
  productId: string,
): Promise<CartResType | { success: false; message: string }> {
  try {
    const token = await myToken();

    if (!token) {
      return { success: false, message: "Please login first" };
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token as string,
        },
      },
    );

    const finalRes = await res.json();

    if (res.ok) {
      revalidateTag("cart-data");
      revalidateTag("cart");
      return finalRes;
    } else {
      return {
        success: false,
        message: finalRes.message || "Failed to delete item",
      };
    }
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Server Error" };
  }
}

export async function updateCartCountAction(productId: string, count: number) {
  try {
    const token = await myToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          count: count.toString(),
        }),
        cache: "no-store",
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update Action Error:", error);
    return null;
  }
}
export async function clearCartAction() {
  try {
    const token = await myToken();
    const response = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "DELETE",
      headers: {
        token: token as string,
      },
      cache: "no-store",
    });

    // ✅ بدل ما تقرأ الـ body، اتحقق من الـ status code بس
    if (response.ok) {
      revalidateTag("cart-data");
      revalidateTag("cart");
      return { message: "success" };
    }

    return null;
  } catch (error) {
    console.error("Clear Cart Error:", error);
    return null;
  }
}
