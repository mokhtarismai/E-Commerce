"use server";
import { ProductType } from "@/types/product.type";
import { myToken } from "@/utils/myToken";
import { revalidateTag } from "next/cache";

interface addToWishlistType {
    status: string;
    message: string;
    data: string[];
}

export interface wishlistType {
    status: string;
    count: number;
    data: ProductType[];
}

export async function addToWishlist(
    productId: string,
): Promise<addToWishlistType> {
    const token = await myToken();

    console.log(token);

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        method: "POST", 
        headers: {
            token: token as string,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
    });

    const finalRes = await res.json();
    console.log(finalRes);

    return finalRes; 
}

export async function getWishlist(): Promise<wishlistType | null> {
    const token = await myToken();

    try{
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: {
            token: token as string,
        },
        next:{
            tags:["wishlist"]
        }
    });

    const finalRes = await res.json();
    console.log(finalRes);

    return finalRes; 
    }catch(error){
        return null;
    }
}


export async function removeFromWishlist(
    productId: string,
): Promise<addToWishlistType> {
    const token = await myToken();

    console.log(token);

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        method: "Delete", 
        headers: {
            token: token as string, 
        },
    });

    const finalRes = await res.json();
    revalidateTag("wishlist");
    console.log(finalRes);

    return finalRes; 
}