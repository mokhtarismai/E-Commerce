"use client";
import React from "react";
import Image from "next/image";
// استيراد اللوجو بتاعك (تأكد من المسار الصحيح)
import logoImg from "./assets/freshcart-logo.49f1b44d.svg"; 

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white">
      {/* حاوية اللوجو مع تأثير النبض */}
      <div className="relative flex flex-col items-center">
        <div className="animate-pulse mb-4">
          <Image
            src={logoImg}
            alt="FreshCart Logo"
            width={200}
            height={60}
            priority
            className="object-contain"
          />
        </div>

        {/* مؤشر تحميل شيك جداً (خط بيتحرك) */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-[#0aad0a] animate-loading-bar w-full origin-left"></div>
        </div>
        
        <p className="mt-4 text-sm font-medium text-gray-500 animate-bounce">
          Preparing your groceries...
        </p>
      </div>

      {/* لو حابب تضيف الـ Spinner بتاع الـ Bars بشكل صغير تحت اللوجو */}
      <style jsx global>{`
        @keyframes loading-bar {
          0% { transform: scaleX(0); transition: cubic-bezier(0.1, 0, 0.45, 1); }
          50% { transform: scaleX(0.5); }
          100% { transform: scaleX(1); }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}