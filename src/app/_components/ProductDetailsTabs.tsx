"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FaBoxOpen, FaStar, FaTruck, FaCheckCircle } from "react-icons/fa";

export default function ProductTabs({ product }: { product: any }) {
  return (
    <div className="mt-10  shadow-xs border-x border-gray-100">
      <Tabs defaultValue="details" className="">
        {/* شريط الزراير - التعديل هنا عشان يبقى نفس الصورة */}
        <TabsList
          variant="line"
          className="bg-transparent! border-none! shadow-none!"
        >
          <TabsTrigger
            value="details"
            className="px-6! py-6! font-medium! text-[16px]! flex! items-center! gap-2! rounded-none! 
              border-transparent!
             
             data-[state=active]:bg-emerald-50/50!
             data-[state=active]:text-emerald-600! 
             
             
             text-gray-500! transition-all! shadow-none!"
          >
            <FaBoxOpen className="text-lg" />
            Product Details
          </TabsTrigger>

          <TabsTrigger
            value="reviews"
            className="px-6! py-6! font-medium! text-[16px]! flex! items-center! gap-2! rounded-none! 
              border-transparent!
             
             data-[state=active]:bg-emerald-50/50!
             data-[state=active]:text-emerald-600! 
             focus-visible:ring-0!
             focus-visible:outline-none!
             text-gray-500! transition-all! shadow-none!"
          >
            <FaStar className="text-lg" />
            Reviews (14)
          </TabsTrigger>

          <TabsTrigger
            value="shipping"
            className="px-6! py-6! font-medium! text-[16px]! flex! items-center! gap-2! rounded-none! 
              border-transparent!
             
             data-[state=active]:bg-emerald-50/50!
             data-[state=active]:text-emerald-600! 
             focus-visible:ring-0!
             focus-visible:outline-none!
             text-gray-500! transition-all! shadow-none!"
          >
            <FaTruck className="text-lg" />
            Shipping & Returns
          </TabsTrigger>
        </TabsList>

        {/* محتوى التابة الأولى: Product Details */}
        <TabsContent
          value="details"
          className="animate-in fade-in-50 duration-500 outline-none p-6"
        >
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About this Product
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-800">Product Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-400">Category</span>
                    <span className="font-medium text-gray-800">
                      {product.category?.name}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-50 pb-2">
                    <span className="text-gray-400">Brand</span>
                    <span className="font-medium text-gray-800">
                      {product.brand?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Items Sold</span>
                    <span className="font-medium text-emerald-600">
                      {product.sold}+ sold
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-800">Key Features</h4>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-emerald-600 font-medium">
                    <FaCheckCircle /> Premium Quality Product
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 font-medium">
                    <FaCheckCircle /> 100% Authentic Guarantee
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 font-medium">
                    <FaCheckCircle /> Fast & Secure Packaging
                  </li>
                  <li className="flex items-center gap-2 text-emerald-600 font-medium">
                    <FaCheckCircle /> Quality Tested
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* محتوى التابة التانية: Reviews */}
        <TabsContent
          value="reviews"
          className="animate-in fade-in-50 duration-500 outline-none p-6"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center">
            {/* الجزء الشمال: التقييم الكلي */}
            <div className="text-center md:border-r md:pr-10 border-gray-100">
              <h2 className="text-5xl font-bold text-gray-900 mb-2">
                {product?.ratingsAverage || 0}
              </h2>
              <div className="flex text-yellow-400 my-2 justify-center text-lg">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={
                      star <= (product?.ratingsAverage || 0)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Based on {product?.ratingsQuantity || 0} reviews
              </p>
            </div>

            {/* الجزء اليمين: تفاصيل النجوم بنفس حسبة الديمو */}
     <div className="flex-1 w-full space-y-3">
  {[5, 4, 3, 2, 1].map((star) => {
    let percentage = 0;

    // الحسبة دي مطابقة للسكرين شوت اللي بعتها بالظبط
    if (star === 5) percentage = 60;      // الـ 5 نجوم هي اللي واخدة الـ 60%
    else if (star === 4) percentage = 25; // الـ 4 نجوم واخدة 25%
    else if (star === 3) percentage = 10;
    else if (star === 2) percentage = 5;
    else percentage = 5;

    return (
      <div key={star} className="flex items-center gap-4 mb-2">
        <span className="text-sm text-gray-600 w-8">
          {star} star
        </span>
        <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all duration-700"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-400 w-10 text-right font-medium ">
          {percentage}%
        </span>
      </div>
    );
  })}
</div>
          </div>

          {/* زرار المراجعة */}
          <div className="mt-12 flex flex-col items-center justify-center border-t border-gray-50 pt-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
              <FaStar className="text-2xl text-gray-200" />
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Customer reviews will be displayed here.
            </p>
            <button className="text-emerald-600 font-bold hover:underline">
              Write a Review
            </button>
          </div>
        </TabsContent>

        {/* محتوى التابة التالتة: Shipping */}
        <TabsContent
          value="shipping"
          className="animate-in fade-in-50 duration-500 outline-none p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-linear-to-br from-[#f0fdf4] to-[#dcfce7] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-[#16a34a] text-white rounded-full flex items-center justify-center gap-3">
                  <FaTruck size={24} />
                </div>
                <h4 className="font-semibold text-emerald-900 ">
                  Shipping Information
                </h4>
              </div>
              <p className="text-sm text-emerald-800/70 mb-4 font-medium">
                Fast delivery options available
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Free shipping over $50</li>
                <li>• Delivery within 3-5 days</li>
                <li>• Express delivery available (1-2 business days)</li>
                <li>• Track your order in real-time</li>
              </ul>
            </div>
            <div className="bg-linear-to-br from-[#f0fdf4] to-[#dcfce7] rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-[#16a34a] text-white rounded-full flex items-center justify-center gap-3 ">
                  <FaBoxOpen size={24} />
                </div>
                <h4 className="font-semibold text-emerald-900 ">
                  Returns & Refunds
                </h4>
              </div>
              <p className="text-sm text-emerald-800/70 mb-4 font-medium">
                Easy return process
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 30-day money back guarantee</li>
                <li>• Full refund or exchange available</li>
                <li>• Free return shipping on defective items</li>
                <li>• Easy online return process</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
