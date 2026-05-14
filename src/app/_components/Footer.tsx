import React from "react";
// افترضت إن المسار كدة، عدله حسب مكان الملف عندك فعلاً
import logo from "../assets/freshcart-logo.49f1b44d.svg"; 
import {
  FaShippingFast,
  FaUndoAlt,
  FaShieldAlt,
  FaHeadset,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

export default function Footer() {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Free Shipping",
      desc: "On orders over 500 EGP",
    },
    {
      icon: <FaUndoAlt />,
      title: "Easy Returns",
      desc: "14-day return policy",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      desc: "100% secure checkout",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      desc: "Contact us anytime",
    },
  ];

  const footerLinks = {
    Shop: ["All Products", "Categories", "Brands", "Electronics", "Men's Fashion", "Women's Fashion"],
    Account: ["My Account", "Order History", "Wishlist", "Shopping Cart", "Sign In", "Create Account"],
    Support: ["Contact Us", "Help Center", "Shipping Info", "Returns & Refunds", "Track Order"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="w-full font-sans mt-16">
      {/* 1. سكشن المميزات (Features Bar) */}
      <div className="bg-[#f0fdf4] border-y border-[#dcfce7]">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 bg-emerald-100/60 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. الفوتر الرئيسي (الأسود) */}
      <div className="bg-[#0f172a] text-gray-400">
        <div className="container mx-auto px-4 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 pb-12">
            
            {/* اللوجو من الـ Assets ومعلومات التواصل */}
            <div className="lg:col-span-2 space-y-6">
              {/* هنا استخدمنا اللوجو بتاعك اللي في الـ assets */}
              <div className="bg-white inline-block px-4 py-2 rounded-xl shadow-sm">
                <img 
                  src={logo.src} 
                  alt="FreshCart Logo" 
                  className="h-8 w-auto object-contain" 
                />
              </div>

              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices.
              </p>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 hover:text-[#22c55e] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center text-[#22c55e]">
                    <FaPhoneAlt size={14} />
                  </div>
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 hover:text-[#22c55e] transition-colors cursor-pointer group">
                  <div className="w-8 h-8 flex items-center justify-center text-[#22c55e]">
                    <FaEnvelope size={14} />
                  </div>
                  <span>support@freshcart.com</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 flex items-center justify-center text-[#22c55e]">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>

              {/* السوشيال ميديا */}
              <div className="flex gap-3 pt-2">
                {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#16a34a] hover:text-white transition-all cursor-pointer border border-white/10 text-white">
                    <Icon size={14} />
                  </div>
                ))}
              </div>
            </div>

            {/* لينكات الفوتر */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-6">
                <h4 className="text-white font-bold text-lg">{title}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-emerald-500 hover:translate-x-1 inline-block transition-all">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 3. الحقوق وطرق الدفع (Bottom Bar) */}
          <div className=" py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-500 text-sm text-center md:text-left">© 2026 FreshCart. All rights reserved.</p>
            <div className="flex items-center gap-8 opacity-70">
              <div className="flex items-center gap-2 text-xs">
                <FaCcVisa size={28} />
                <span className=" ">Visa</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FaCcMastercard size={28} />
                <span className="sm:inline">Mastercard</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <FaCcPaypal size={22} />
                <span className=" ">PayPal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}