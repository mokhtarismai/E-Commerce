"use server";

import { myToken } from '@/utils/myToken';
import { jwtDecode } from 'jwt-decode';


// 1. بيانات عنوان الشحن
export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
    postalCode: string;
}

// 2. بيانات المستخدم صاحب الطلب
export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
}

// 3. تفاصيل المنتج الفرعية (Category & Brand)
export interface CategoryOrSub {
    _id: string;
    name: string;
    slug: string;
    image?: string;
    category?: string;
}

// 4. بيانات المنتج نفسه داخل الـ Cart
export interface ProductDetails {
    subcategory: CategoryOrSub[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: CategoryOrSub;
    brand: CategoryOrSub;
    ratingsAverage: number;
    id: string;
}

// 5. العنصر الواحد داخل السلة
export interface CartItem {
    count: number;
    _id: string;
    product: ProductDetails;
    price: number;
}

// 6. الـ Interface الأساسي للطلب (The Main Interface)
export interface Order {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: "cash" | "card"; // حددتها بناءً على المنطق
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: User;
    cartItems: CartItem[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
}

interface MyToken {
    id: string;
}

export async function getOrders(): Promise<Order[] | null> {
    const token = await myToken();
    const decoded = jwtDecode<{ id: string }>(token as string);

    try {
        const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`,
        );

        const finalres = await res.json();
        console.log(finalres);
        return finalres;
    } catch (error) {
        return null;
    }
}