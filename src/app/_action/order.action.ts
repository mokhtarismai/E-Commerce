"use server";

import { myToken } from "@/utils/myToken";

interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export async function createCashOrder(
  cartId: string,
  address: ShippingAddress,
) {
  const token = await myToken();

  if (!token) {
    return { success: false, message: "Authentication token is missing." };
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string, // التوكن مطلوب في الهيدر حسب الصورة
        },
        body: JSON.stringify({
          shippingAddress: {
            details: address.details,
            phone: address.phone,
            city: address.city,
            postalCode: address.postalCode,
          },
        }),
      },
    );

    const result = await response.json();

    if (result.status === "success") {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        message: result.message || "Failed to create order",
      };
    }
  } catch (error) {
    console.error("Order Action Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
export async function createVisaOrder(
  cartId: string,
  address: ShippingAddress,
  baseUrl: string, 
) {
  const token = await myToken();

  if (!token) {
    return { success: false, message: "Authentication token is missing." };
  }

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token as string,
        },
        body: JSON.stringify({
          shippingAddress: {
            details: address.details,
            phone: address.phone,
            city: address.city,
          },
        }),
      }
    );

    const result = await response.json();

    if (result.status === "success") {
      return { success: true, sessionUrl: result.session.url };
    } else {
      return { success: false, message: result.message || "Failed to initialize payment" };
    }
  } catch (error) {
    return { success: false, message: "Internal Server Error" };
  }
}

