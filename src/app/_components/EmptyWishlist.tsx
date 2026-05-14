import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const EmptyWishlist = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* أيقونة القلب في الخلفية الرمادية الناعمة */}
      <div className="bg-gray-100 p-6 rounded-2xl mb-6">
        <Heart size={48} className="text-gray-400 font-light" strokeWidth={1.5} />
      </div>

      {/* النصوص */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-gray-500 mb-8">
        Browse products and save your favorites here.
      </p>

      {/* الزر الأخضر */}
      <Link href={"/products"}
        className="flex items-center gap-2 bg-[#1a8a47] hover:bg-[#156e39] text-white px-10 py-3 rounded-lg font-medium transition-all duration-200"
      >
        Browse Products
        <ArrowRight size={18} />
      </Link>
    </div>
  );
};

export default EmptyWishlist;