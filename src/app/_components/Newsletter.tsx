import React from "react";
import {
  FaPaperPlane,
  FaApple,
  FaGooglePlay,
  FaStar,
  FaLongArrowAltRight,
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Newsletter() {
 
  return (
    <section className="container mx-auto px-4 py-16 font-sans">
      {/* الـ Grid الأساسي: 5 أعمدة في الشاشات الكبيرة */}
      <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8 p-8 lg:p-14 bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
        <div className="lg:col-span-3 space-y-6 flex flex-col justify-center">
          {/* ضفنا flex و justify-center عشان يوسط المحتوى لو المساحة كبرت */}

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 text-white shrink-0">
              <IoMdMail size={26} />
            </div>
            <div>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">
                NEWSLETTER
              </p>
              <p className="text-xs text-gray-500 font-medium">
                50,000+ subscribers
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
              Get the Freshest Updates
              <span className="text-emerald-600"> Delivered Free</span>
            </h2>
            <p className="text-gray-500 mt-1 text-lg">
              {" "}
              {/* قللنا الـ mt هنا شوية */}
              Weekly recipes, seasonal offers & exclusive member perks directly
              to your inbox.
            </p>
          </div>

          {/* الـ Badges الصغيرة */}
          <div className="flex flex-wrap gap-3">
            {[
              "Fresh Picks Weekly",
              "Free Delivery Codes",
              "Members-Only Deals",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm text-sm font-medium"
              >
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                {text}
              </div>
            ))}
          </div>

          {/* Form الاشتراك */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <div className="flex-1">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm"
              />
            </div>
            <button className="group flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-bold text-white bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-95">
              <span>Subscribe</span>
              <FaLongArrowAltRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-0! pl-1">
            ✨ Unsubscribe anytime. No spam, ever.
          </p>
        </div>

        <div className="lg:col-span-2 bg-[#0f172a] rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10 flex flex-col justify-between min-h-100">
          <div className="relative z-10 space-y-5">
            <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-500/30">
              📱 MOBILE APP
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold leading-tight">
                Shop Faster on Our App
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get app-exclusive deals & 15% off your first order.
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer">
                <FaApple size={30} />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                    Download on
                  </p>
                  <p className="text-base font-bold">App Store</p>
                </div>
              </button>

              <button className="flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer">
                <FaGooglePlay size={26} className="text-emerald-500" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                    Get it on
                  </p>
                  <p className="text-base font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>

          <div className="relative flex items-center gap-2 pt-2 text-sm">
            <div className="flex text-yellow-400">★★★★★</div>
            <p className="text-gray-400">4.9 | 100K+ Downloads</p>
          </div>

          {/* Glow Effects */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl"></div>
        </div>
      </div>
    
    </section>
  );
}
