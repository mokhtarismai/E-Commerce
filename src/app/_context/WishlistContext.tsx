"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
// 1. غير اسم الـ Import هنا باستخدام 'as' عشان نفرق بينه وبين دالة الـ Context
import {
  getWishlist,
  removeFromWishlist as removeFromWishlistAPI,
} from "../_action/wishlist.actions";
import { toast } from "sonner";

interface WishlistContextType {
  wishlistCount: number;
  setWishlistCount: (count: number) => void;
  wishlistIds: string[];
  setWishlistIds: (ids: string[]) => void;
  isWishlistLoading: boolean;
  removeFromWishlist: (productId: string) => Promise<void>;
  getWishlistData: () => Promise<void>;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  async function getWishlistData() {
    try {
      setIsWishlistLoading(true);
      const res = await getWishlist();
      if (res && res.status === "success") {
        setWishlistCount(res.count || 0);
        const ids = res.data.map((item: any) => item.id);
        setWishlistIds(ids);
      }
    } catch (error) {
      console.error("Wishlist fetch error:", error);
    } finally {
      setIsWishlistLoading(false);
    }
  }

 async function removeFromWishlist(productId: string) {
  try {
    const res = await removeFromWishlistAPI(productId);

    if (res && res.status === "success") {
      toast.success("Removed from wishlist");
      setWishlistCount(res.data.length || 0);
      setWishlistIds(res.data); // ✅ res.data هنا array of IDs string[] - تمام
    }
  } catch (error) {
    toast.error("Failed to remove item");
  }
}
  useEffect(() => {
    getWishlistData();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        setWishlistCount,
        wishlistIds,
        setWishlistIds,
        isWishlistLoading,
        removeFromWishlist,
        getWishlistData,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
