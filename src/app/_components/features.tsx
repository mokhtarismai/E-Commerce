import React from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FaTruck, FaHeadset, FaArrowRotateLeft } from "react-icons/fa6";

const featureList = [
  {
    icon: <FaTruck className="text-blue-500" />,
    title: "Free Shipping",
    desc: "On orders over 500 EGP",
    bgColor: "bg-blue-50",
  },
  {
    icon: <FaShieldAlt className="text-green-500" />,
    title: "Secure Payment",
    desc: "100% secure transactions",
    bgColor: "bg-green-50",
  },
  {
    icon: <FaArrowRotateLeft className="text-orange-500" />,
    title: "Easy Returns",
    desc: "14 day return policy",
    bgColor: "bg-orange-50",
  },
  {
    icon: <FaHeadset className="text-purple-500" />,
    title: "24/7 Support",
    desc: "Dedicated support team",
    bgColor: "bg-purple-50",
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureList.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`p-4 rounded-full ${item.bgColor} text-2xl`}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-[#21313c] text-sm">{item.title}</h3>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}