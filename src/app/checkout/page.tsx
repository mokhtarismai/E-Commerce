"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaCity,
  FaHouse,
  FaReceipt,
  FaMoneyBill,
  FaCreditCard,
  FaCheck,
  FaShieldHalved,
  FaBox,
  FaBagShopping,
  FaTruck,
  FaArrowRotateLeft,
  FaLocationDot,
  FaArrowLeftLong,
  FaCircleInfo,
  FaMapPin,
  FaWallet,
} from "react-icons/fa6";
import { BsTelephoneFill } from "react-icons/bs";

import { CheckoutFormData, checkoutSchema } from "./checkout.scema";
import { CartContext } from "../_context/ContextCart";
import { createCashOrder, createVisaOrder } from "../_action/order.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getUserCart } from "../_action/card.actions";

// مكونات بسيطة
const Input = (props: any) => <input {...props} />;
const Textarea = (props: any) => <textarea {...props} />;
const Button = ({ children, className, ...props }: any) => (
  <button className={className} {...props}>
    {children}
  </button>
);
const Field = ({ children }: any) => (
  <div className="space-y-2">{children}</div>
);
const FieldLabel = ({ children, className, ...props }: any) => (
  <label
    className={`block text-sm font-medium text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </label>
);
const FieldError = ({ errors }: { errors: any[] }) => (
  <p className="text-red-500 text-xs mt-1">{errors[0]?.message}</p>
);

export default function CheckoutPage() {
  const context = useContext(CartContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("cash");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { city: "", details: "", phone: "", postalCode: "" },
  });

  if (!context)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Context...
      </div>
    );

  const {
    CartProduct,
    totalPriceOfCart,
    cartCount,
    cartId,
    clearCart,
    isCartLoading,
  } = context;
  const shippingFee = totalPriceOfCart >= 500 ? 0 : 50;
  const finalTotal = totalPriceOfCart + shippingFee;

  const onSubmit = async (values: CheckoutFormData) => {
    setIsLoading(true);

    try {
      const freshCart = await getUserCart();

      const currentCartId = freshCart?.data?._id;

      if (!currentCartId) {
        toast.error("Cart not found");
        return;
      }

      if (paymentType === "cash") {
        const result = await createCashOrder(currentCartId, values);
        if (result.success) {
          toast.success("Order Placed Successfully! 🎉");
          clearCart();
          router.push("/allorders");
        } else {
          toast.error(result.message || "Something went wrong");
        }
      }

      // ✅ أضف الـ visa case
      if (paymentType === "visa") {
        const baseUrl = window.location.origin; // هنا على الـ client تمام
        const result = await createVisaOrder(currentCartId, values, baseUrl);
        if (result.success && result.sessionUrl) {
          clearCart();
          window.location.href = result.sessionUrl; // redirect لـ Stripe
        } else {
          toast.error(result.message || "Payment failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 py-8 min-h-screen font-sans" dir="ltr">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-green-600 transition" href="/">
              Home
            </Link>
            <span>/</span>
            <Link className="hover:text-green-600 transition" href="/cart">
              Cart
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <FaReceipt />
                </div>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all group"
              href="/cart"
            >
              <FaArrowLeftLong className="group-hover:-translate-x-1 transition-all" />{" "}
              Back to Cart
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Forms */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 rounded-t-2xl text-white">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaHouse /> Shipping Address
                  </h2>
                  <p className="text-primary-100 text-sm mt-1">
                    Where should we deliver your order?
                  </p>
                </div>

                <div className="p-6 space-y-5">
                  <div className="bg-[#eff6ff] border border-[#dbeafe] p-4 rounded-xl flex gap-4 items-center mb-6">
                    {/* Icon Section with Circle Background */}
                    <div className="bg-[#3b82f6] text-white p-2 rounded-full shrink-0 flex items-center justify-center">
                      <FaCircleInfo size={16} />
                    </div>

                    {/* Text Section */}
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-[#1e40af] text-sm font-bold leading-none">
                        Delivery Information
                      </h4>
                      <p className="text-[#3b82f6] text-xs font-medium">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>
                  {/* City */}
                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="city">
                          City <span className="text-red-600">*</span>
                        </FieldLabel>
                        <div className="relative flex items-center">
                          <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 text-gray-400 text-lg">
                            <FaCity />
                          </div>
                          <Input
                            {...field}
                            id="city"
                            placeholder="e.g. Cairo"
                            className={`w-full pl-14 py-3.5 pr-4 border-2 rounded-xl focus:outline-none transition-all ${fieldState.invalid ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Street Details */}
                  <Controller
                    name="details"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="details">
                          Street Address <span className="text-red-600">*</span>
                        </FieldLabel>
                        <div className="relative flex">
                          <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 top-3 text-gray-400 text-lg">
                            <FaLocationDot />
                          </div>
                          <Textarea
                            {...field}
                            id="details"
                            placeholder="Street name, building..."
                            className={`resize-none min-h-24 w-full pl-14 py-3.5 pr-4 border-2 rounded-xl focus:outline-none transition-all ${fieldState.invalid ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {/* Phone */}
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="phone">
                          Phone <span className="text-red-600">*</span>
                        </FieldLabel>
                        <div className="relative flex items-center">
                          <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 text-gray-400 text-lg">
                            <BsTelephoneFill />
                          </div>
                          <Input
                            {...field}
                            id="phone"
                            placeholder="01xxxxxxxxx"
                            type="tel"
                            className={`w-full pl-14 py-3.5 pr-4 border-2 rounded-xl focus:outline-none transition-all ${fieldState.invalid ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="postalCode"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="postalCode">
                          Postal Code <span className="text-red-600">*</span>
                        </FieldLabel>
                        <div className="relative flex items-center">
                          <div className="flex items-center justify-center size-8 bg-gray-100 rounded-lg absolute left-3 text-gray-400 text-lg">
                            <FaMapPin />
                          </div>
                          <Input
                            {...field}
                            id="postalCode"
                            placeholder="12345"
                            className={`w-full pl-14 py-3.5 pr-4 border-2 rounded-xl focus:outline-none transition-all ${fieldState.invalid ? "border-red-500" : "border-gray-200 focus:border-green-500"}`}
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm p-6 space-y-4">
                {/* Header Section */}
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] -mx-6 -mt-6 px-6 py-4 mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaWallet /> Payment Method
                  </h2>
                  <p className="text-[#dcfce7] text-sm mt-1">
                    Choose how you'd like to pay
                  </p>
                </div>

                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentType("cash")}
                  className={`cursor-pointer p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    paymentType === "cash"
                      ? "border-[#16a34a] bg-green-50/30"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                      paymentType === "cash"
                        ? "bg-linear-to-br from-[#22c55e] to-[#16a34a] text-white"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <FaMoneyBill className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentType === "cash"
                        ? "border-[#16a34a]"
                        : "border-gray-200"
                    }`}
                  >
                    {paymentType === "cash" && (
                      <div className="w-2.5 h-2.5 bg-[#16a34a] rounded-full" />
                    )}
                  </div>
                </div>

                {/* Online Payment */}
                <div
                  onClick={() => setPaymentType("visa")}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                    paymentType === "visa"
                      ? "border-[#16a34a] bg-blue-50/30"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-colors ${
                      paymentType === "visa"
                        ? "bg-linear-to-br from-[#00b09b] to-[#0061ff] text-white"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <FaCreditCard className="text-xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 ">Pay Online</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex gap-1.5 mt-1.5 opacity-80">
                      <img
                        src="https://img.icons8.com/color/48/visa.png"
                        className="h-5"
                        alt="visa"
                      />
                      <img
                        src="https://img.icons8.com/color/48/mastercard.png"
                        className="h-5"
                        alt="mastercard"
                      />
                      <img
                        src="https://img.icons8.com/color/48/amex.png"
                        className="h-5"
                        alt="amex"
                      />
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                      paymentType === "visa"
                        ? "bg-[#16a34a] text-white"
                        : "border-2 border-gray-200"
                    }`}
                  >
                    {paymentType === "visa" && (
                      <FaCheck className="text-[10px]" />
                    )}
                  </div>
                </div>

                {/* Secure Footer Section */}
                <div className="bg-[#f0fdf4] border border-[#dcfce7] p-3 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <FaShieldHalved className="text-[#16a34a]" size={12} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Secure & Encrypted
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-md sticky top-6">
                {/* Header Section - Exact Match */}
                <div className="bg-linear-to-r from-[#16a34a] to-[#15803d] px-6 py-4 text-white">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaBagShopping size={14} /> Order Summary
                  </h2>
                  <p className="text-green-100 text-sm mt-1">
                    {cartCount || 0} items
                  </p>
                </div>

                <div className="p-5">
                  {/* Products List with Custom Scrollbar */}
                  <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                    {CartProduct?.map((item: any) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0 relative">
                          <Image
                            src={item.product.imageCover}
                            alt={item.product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.product.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.count} × {item.price} EGP
                          </p>
                        </div>
                        <div className="text-sm font-bold text-gray-900 shrink-0">
                          {item.count * item.price}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals Section */}
                  <div className="space-y-3 pt-4 border-t border-gray-50">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {totalPriceOfCart} EGP
                      </span>
                    </div>
                    <div className="flex justify-between  text-gray-500 font-medium">
                      <span className="flex items-center gap-2">
                        <FaTruck className="text-gray-400" size={12} /> Shipping
                      </span>
                      <span className="text-[#16a34a] font-bold uppercase ">
                        {shippingFee === 0 ? "Free" : `${shippingFee} EGP`}
                      </span>
                    </div>

                    <div className="pt-4 flex justify-between items-end">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#16a34a]">
                          {finalTotal}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Action Button */}
                <Button
  type="submit"
  disabled={isLoading}
  className="cursor-pointer w-full mt-6 bg-linear-to-r from-[#16a34a] to-[#15803d] text-white py-4 rounded-xl font-bold hover:from-[#15803d] hover:to-[#14532d] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 active:scale-[0.98]"
>
  <div className="bg-white/20 p-1 rounded-md">
    {isLoading ? (
      // أيقونة اللودنج أثناء التحميل
      <svg className="animate-spin h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    ) : paymentType === "cash" ? (
      <FaBox size={10} />
    ) : (
      <FaShieldHalved size={10} />
    )}
  </div>
  
  <span>
    {isLoading 
      ? "Processing..." 
      : paymentType === "cash" 
        ? "Place Order" 
        : "Proceed to Payment"}
  </span>
</Button>

                  {/* Trust Badges Footer - From Image */}
                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaShieldHalved className="text-green-500" size={12} />
                      <span className=" font-bold text-gray-400 uppercase">
                        Secure
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaTruck className="text-blue-500" size={12} />
                      <span className=" font-bold text-gray-400 uppercase">
                        Fast Delivery
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaArrowRotateLeft
                        className="text-orange-500"
                        size={12}
                      />
                      <span className=" font-bold text-gray-400 uppercase">
                        Easy Returns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
