"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaPlus,
  FaMinus,
  FaLock,
  FaTruck,
  FaTag,
  FaShoppingBag,
  FaBoxOpen,
  FaCheck,
  FaRegTrashAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaCartShopping, FaChevronRight } from "react-icons/fa6";
import { MdArrowRightAlt, MdDelete } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CartContext } from "../_context/ContextCart";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function CartPage() {
  const context = useContext(CartContext);

  // 1. التأكد إن الكونتكس موجود
  if (!context) return null;

  const {
    cartCount,
    totalPriceOfCart,
    CartProduct,
    clearCart,
    setCartProduct,
    setCartCount,
    setTotalPriceOfCart,
  } = context;

  // 2. معالجة حالة الـ Loading (لما يكون null)
  if (CartProduct === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <AiOutlineLoading3Quarters className="text-green-600 animate-spin text-5xl mb-4" />
        <p className="text-gray-500 font-bold animate-pulse">
          Loading Your Cart...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="container mx-auto px-4">
        {CartProduct.length > 0 ? (
          <>
            {/* Header Section */}
            <div className="mb-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link href="/" className="hover:text-green-600 transition">
                  Home
                </Link>
                <FaChevronRight size={8} />
                <span className="text-gray-900 font-medium">Shopping Cart</span>
              </nav>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                    <FaCartShopping />
                  </div>
                  Shopping Cart
                </h1>
                <p className="text-gray-500 mt-2">
                  You have{" "}
                  <span className="font-semibold text-green-600">
                    {cartCount} items
                  </span>{" "}
                  in your cart
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Products List */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {CartProduct.map((product: any) => (
                    <CartCard key={product.product.id} product={product} />
                  ))}
                </div>

                {/* Clear Cart Section */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                  <Link
                    href="/"
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2"
                  >
                    <span>←</span> Continue Shopping
                  </Link>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer">
                        <FaRegTrashAlt size={14} />
                        <span>Clear all items</span>
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="ring-0 md:min-w-lg rounded-3xl border-none shadow-2xl">
                      <AlertDialogHeader className="flex flex-col items-center place-items-center! text-center gap-2">
                        <AlertDialogTitle>
                          <div className="size-16 text-3xl rounded-full bg-red-50 mx-auto text-red-500 flex items-center justify-center mb-2">
                            <FaShoppingBag />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">
                            Clear Your Cart?
                          </div>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500">
                          All items will be removed from your cart. This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex-row! justify-center! gap-3 mt-4 border-none">
                        <AlertDialogCancel className="h-auto cursor-pointer border-none bg-gray-100 hover:bg-gray-200! text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all m-0">
                          Keep Shopping
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              // بننادي الدالة من الكونتكس
                              await clearCart();
                              // التحديث اللحظي للـ UI عشان الصفحة تقلب Empty State فوراً
                              setCartProduct([]);
                              setCartCount(0);
                              setTotalPriceOfCart(0);
                            } catch (error) {
                              console.error("Error clearing cart:", error);
                            }
                          }}
                          className="h-auto cursor-pointer bg-red-500 hover:bg-red-600! text-white font-semibold py-3 px-8 rounded-xl transition-all border-none m-0"
                        >
                          Yes, Clear All
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Order Summary Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
                  <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <FaShoppingBag /> Order Summary
                    </h2>
                    <p className="text-green-100 text-sm mt-1">
                      {cartCount} items in your cart
                    </p>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Shipping Info */}
                    <div className="space-y-5">
                      <div className="bg-[#FFF9EE] rounded-2xl p-4 border border-[#FBEFD5] mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-[#FFECE2] p-2 rounded-lg">
                            <FaTruck className="text-[#FF6B00]" size={16} />
                          </div>
                          <span className="text-sm font-bold text-[#4B5563]">
                            {totalPriceOfCart >= 500
                              ? "Free Shipping! You qualify for free delivery"
                              : `Add ${500 - totalPriceOfCart} EGP for free shipping`}
                          </span>
                        </div>

                        <div className="relative h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                          <div
                            className="absolute left-0 top-0 h-full bg-[#FF6B00] transition-all duration-700 ease-out rounded-full"
                            style={{
                              width: `${Math.min((totalPriceOfCart / 500) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium text-gray-900">
                          {totalPriceOfCart.toLocaleString()} EGP
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium text-gray-900">
                          {totalPriceOfCart >= 500 ? "Free" : "50 EGP"}
                        </span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-baseline">
                          <span className="text-gray-900 font-semibold">
                            Total
                          </span>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">
                              {(totalPriceOfCart >= 500
                                ? totalPriceOfCart
                                : totalPriceOfCart + 50
                              ).toLocaleString()}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">
                              EGP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-transparent cursor-pointer h-auto w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all">
                      <FaTag />
                      <span className="text-sm font-medium">
                        Apply Promo Code
                      </span>
                    </Button>

                    {/* Secure Checkout Button (الموجود عندك فعلاً) */}
                    <Link
                      href="/checkout"
                      className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                    >
                      <FaLock /> Secure Checkout
                    </Link>

                    {/* الجزء الجديد: Secure Payment & Fast Delivery */}
                    <div className="mt-6 flex items-center justify-center gap-6 text-xs font-medium text-gray-500">
                      <div className="flex items-center gap-2">
                        <FaShieldAlt className="text-green-500 text-sm" />
                        <span>Secure Payment</span>
                      </div>

                      {/* الخط الفاصل (Divider) */}
                      <div className="h-4 w-px bg-gray-200"></div>

                      <div className="flex items-center gap-2">
                        <FaTruck className="text-blue-500 text-sm" />
                        <span>Fast Delivery</span>
                      </div>
                    </div>

                    {/* زرار الـ Continue Shopping اللي في نص الصورة */}
                    <div className="mt-8 text-center">
                      <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-bold text-sm transition-all group"
                      >
                        <span className="transform transition-transform group-hover:-translate-x-1">
                          ←
                        </span>
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className=" py-20 flex items-center justify-center ">
            <div className="text-center max-w-md">
              <FaBoxOpen className="mx-auto text-gray-400 text-7xl mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-8">
                Start exploring our products now!
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-8 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
              >
                Start Shopping <MdArrowRightAlt size={22} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// دالة CartCard كما هي مع استخدام الـ types بشكل آمن
function CartCard({ product }: { product: any }) {
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(CartContext);

  // حماية في حالة الـ context مش موجود
  if (!context) return null;
  const { deleteItem, updateCartCount } = context;

  const updateCart = async (newCount: number) => {
    if (newCount < 1) return;

    try {
      setIsLoading(true);


      if (updateCartCount) {
        await updateCartCount(product.product.id, newCount);
        console.log("Cart updated via Context!");
      }
    } catch (err) {
      console.error("Update Cart Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const result = await deleteItem(product.product.id);
      if (result && result.status === "success") {
        console.log("Deleted successfully");
      }
    } catch (err) {
      console.error("Delete Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden group">
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-all duration-300 animate-in fade-in">
          <div className="bg-white py-2 px-6 shadow-xl shadow-black/5 border border-gray-100 rounded-full flex items-center gap-2 transform transition-transform duration-300 scale-100 group-hover:scale-105 text-gray-500 font-bold text-sm animate-bounce">
            <AiOutlineLoading3Quarters className="text-green-600 animate-spin" />
            Updating...
          </div>
        </div>
      )}
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          <Link
            href={`/product/${product.product.id}`}
            className="relative shrink-0 group"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden relative shadow-inner">
              <Image
                src={product.product.imageCover}
                alt={product.product.title}
                fill
                className="object-contain transition-all duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <FaCheck size={8} /> In Stock
            </div>
          </Link>
          <div className="flex-1 min-w-0 flex flex-col">
            <Link
              href={`/product/${product.product.id}`}
              className="group/title"
            >
              <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg line-clamp-1">
                {product.product.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                {product.product.category.name}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 uppercase">
                SKU: 5CA{product.product.id.slice(-3)}
              </span>
            </div>
            <div className="my-4 flex items-baseline gap-2">
              <span className="text-green-600 font-bold text-lg">
                {product.price} EGP
              </span>
              <span className="text-xs text-gray-400">per unit</span>
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <Button
                    disabled={product.count <= 1 || isLoading}
                    onClick={() => updateCart(product.count - 1)}
                    className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-all cursor-pointer border border-gray-100"
                  >
                    <FaMinus size={10} />
                  </Button>
                  <span className="w-12 text-center font-bold text-gray-900">
                    {product.count}
                  </span>
                  <Button
                    disabled={isLoading}
                    onClick={() => updateCart(product.count + 1)}
                    className="h-8 w-8 rounded-lg bg-green-600 shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 transition-all cursor-pointer border-none"
                  >
                    <FaPlus size={10} />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {(product.price * product.count).toLocaleString()}
                    <span className="text-sm font-medium text-gray-400 ms-0.5">
                      EGP
                    </span>
                  </p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 tec hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer">
                      <MdDelete size={20} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="ring-0 md:min-w-lg rounded-3xl">
                    <AlertDialogHeader className="place-items-center! text-center">
                      <AlertDialogTitle>
                        <div className="size-16 text-3xl rounded-full bg-red-100 mx-auto text-red-600 flex items-center justify-center">
                          <FaRegTrashAlt />
                        </div>
                        <div className="text-2xl font-bold mt-2 mb-3">
                          Remove Item?
                        </div>
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-500">
                        Remove{" "}
                        <span className="font-bold text-gray-700">
                          {product.product.title}
                        </span>{" "}
                        from your cart?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="bg-white justify-center gap-3 mt-4">
                      <AlertDialogCancel className="h-auto cursor-pointer border-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-8 rounded-xl transition-all">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="h-auto cursor-pointer bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all border-none"
                      >
                        Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
