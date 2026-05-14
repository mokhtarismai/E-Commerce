"use client"
import React, { useState } from "react";
import {
    FaCalendarDays,
    FaBox,
    FaLocationDot,
    FaChevronDown,
    FaChevronUp,
    FaClock,
    FaTruckFast,
    FaShieldHalved,
    FaArrowRotateLeft,
    FaHashtag,
    FaCreditCard
} from "react-icons/fa6";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import test from "@/images/review-image.png"
import Image from "next/image";
import { FaMoneyBill, FaPhone, FaReceipt } from "react-icons/fa";
import { Order } from "../_action/getOrders.action";

const OrderCard = ({ order }: { order: Order }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full mb-6"
        >
            <Card className={`overflow-hidden ${isOpen ? "ring-green-200" : ""} shadow-sm transition-all hover:shadow-md`}>

                {/* --- Header (Visible Part) --- */}
                <div className="p-6">
                    <div className="flex gap-5">
                        <div className="relative shrink-0">
                            <div className="size-20 sm:size-24 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden relative">
                                <Image src={order.cartItems[0].product.imageCover} alt={order.user.name} fill className="w-full h-full object-contain" />
                            </div>
                            {order.cartItems.length > 1 && <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">+{order.cartItems.length - 1}</div>}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <Badge className="bg-amber-100 text-amber-600 text-xs font-semibold mb-2"><FaClock />Processing</Badge>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2"><FaHashtag className="text-gray-400" />{order.id}</h3>
                                </div>
                                {order.paymentMethodType === "cash" ?
                                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 text-gray-600"><FaMoneyBill /></div>
                                    :
                                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100 text-purple-600"><FaCreditCard /></div>
                                }
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                                {/* التاريخ */}
                                <span className="flex items-center gap-1.5">
                                    <FaCalendarDays className="text-xs text-gray-400 mb-0.5" />
                                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>

                                {/* النقطة الفاصلة */}
                                <span className="size-1 rounded-full bg-gray-300"></span>

                                {/* عدد المنتجات */}
                                <span className="flex items-center gap-1.5">
                                    <FaBox className="text-xs text-gray-400" />
                                    {order.cartItems.reduce((acc, item) => {
                                        return acc + item.count;
                                    }, 0)} items
                                </span>

                                {/* النقطة الفاصلة */}
                                <span className="size-1 rounded-full bg-gray-300"></span>

                                {/* الموقع */}
                                <span className="flex items-center gap-1.5">
                                    <FaLocationDot className="text-xs text-gray-400" />
                                    {order.shippingAddress ? order.shippingAddress.city : "cairo"}
                                </span>
                            </div>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">{order.totalOrderPrice}</span>
                                    <span className="text-sm font-medium text-gray-400 ml-1">EGP</span>
                                </div>
                                <CollapsibleTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all h-auto cursor-pointer ${isOpen ? 'bg-green-600! text-white! shadow-lg shadow-green-600/25' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        {isOpen ? 'Hide' : 'Details'}
                                        <FaChevronDown className={`transition-all duration-500 text-sm ${isOpen ? "rotate-180" : ""}`} />
                                    </Button>
                                </CollapsibleTrigger>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Collapsible Content (Details Part) --- */}
                <CollapsibleContent className="bg-white border-t border-gray-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-6 space-y-6 bg-gray-50/50">

                        {/* Items List */}
                        <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                            <FaReceipt className="text-green-600" />
                            Order Items
                        </h4>
                        <div className="space-y-3">
                            {order.cartItems.map((item) => {
                                return <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                                    <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0 relative">
                                        <Image src={item.product.imageCover} alt={item.product.title} fill className="object-contain" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            <span className="font-medium text-gray-700">{item.count}</span> × {item.price} EGP
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-lg font-bold text-gray-900">{item.count * item.price}</p>
                                        <p className="text-xs text-gray-400">EGP</p>
                                    </div>
                                </div>
                            })}

                        </div>

                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-gray-100">
                                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <FaLocationDot className="text-blue-600" />
                                    </div>
                                    Delivery Address
                                </h4>
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">{order.shippingAddress ? order.shippingAddress.city : "cairo"}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{order.shippingAddress ? order.shippingAddress.details : "hello"}</p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2 pt-1"><FaPhone />{order.shippingAddress ? order.shippingAddress.phone : "01265448799"}</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
                                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                                        <FaClock className="text-white" />
                                    </div>
                                    Order Summary
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">{order.totalOrderPrice} EGP</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-medium">{order.totalOrderPrice > 500 ? "Free" : 50}</span>
                                    </div>
                                    <hr className="border-gray-200/50 my-2" />
                                    <div className="flex justify-between pt-1">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="font-bold text-lg text-gray-900">{order.totalOrderPrice > 500 ? order.totalOrderPrice : order.totalOrderPrice + 50} EGP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CollapsibleContent>
            </Card>
        </Collapsible >
    );
};

export default OrderCard;