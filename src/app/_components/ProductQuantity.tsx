"use client";
import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import AddToCartBigBtn from "./AddToCartBigBtn"; // الزرار اللي عملناه قبل كدة

interface Props {
  productId: string;
  stock: number;
  price: number;
}

export default function ProductQuantity({ productId, stock, price }: Props) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    if (quantity < stock) setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="space-y-6">
      {/* التحكم في الكمية */}
      <div className="flex items-center gap-6">
        <div className="space-y-2">
          <span className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </span>
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden w-fit">
            <button 
              onClick={decrement}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-30"
              disabled={quantity <= 1}
            >
              <FaMinus size={10} />
            </button>
            <span className="w-16 text-center text-lg font-medium">
              {quantity}
            </span>
            <button 
              onClick={increment}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition disabled:opacity-30"
              disabled={quantity >= stock}
            >
              <FaPlus size={10} />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          {stock} available
        </p>
      </div>

      {/* شريط السعر النهائي (بيتحسب بناءً على الكمية) */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
        <span className="text-gray-600">Total Price:</span>
        <span className="text-2xl font-bold text-[#16a34a]">
          {(price * quantity).toLocaleString()} EGP
        </span>
      </div>

      {/* أزرار الأكشن - بتبعت الكمية المختارة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <AddToCartBigBtn productId={productId} quantity={quantity} />
        <button className="bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
           Buy Now
        </button>
      </div>
    </div>
  );
}