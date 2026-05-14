"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { IoClose, IoSearch } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { signOut, useSession } from "next-auth/react";
import logo from "../assets/freshcart-logo.49f1b44d.svg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NavMenu() {
  const [openNav, setOpenNav] = useState(false);
  const { data: session, status } = useSession();

  const toggleNav = () => setOpenNav((prev) => !prev);

  return (
    <div className="lg:hidden ml-auto">
      {/* زرار الـ Burger */}
      <ul className="p-0 list-none flex gap-1 items-center">
        <li className="ms-3">
          <button
            onClick={toggleNav}
            className="rounded-full cursor-pointer w-10 h-10 flex items-center justify-center text-white bg-emerald-600 hover:bg-emerald-700 text-xl font-medium transition-all shadow-md"
          >
            <FaBars />
          </button>
        </li>
      </ul>

      {/* الـ Overlay */}
      <div
        className={`fixed inset-0 transition-all duration-500 bg-black/40 backdrop-blur-sm ${
          openNav ? "opacity-100 visible z-200" : "opacity-0 invisible -z-10"
        }`}
        onClick={toggleNav}
      >
        <div
          className={`fixed top-0 bottom-0 w-80 bg-white transition-all duration-500 shadow-2xl ${
            openNav ? "right-0" : "-right-full"
          } z-201 flex flex-col`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2" onClick={toggleNav}>
              <Image src={logo} alt="FreshCart Logo" width={140} height={40} />
            </Link>
            <button
              onClick={toggleNav}
              className="rounded-full items-center justify-center bg-gray-100 hover:bg-red-50 hover:text-red-500 transition-all text-xl text-gray-600 w-9 h-9 cursor-pointer flex"
            >
              <IoClose />
            </button>
          </div>

          {/* محتوى المنيو القابل للتمرير */}
          <div className=" overflow-y-auto">
            {/* خانة البحث */}
            <div className="px-5 py-4">
              <form className="relative flex-1">
                <Input
                  placeholder="Search products..."
                  className="rounded-xl focus:border-emerald-500! focus-visible:ring-emerald-100! py-6 pr-12 border-gray-200"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-0 w-9 h-9 flex items-center justify-center cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                >
                  <IoSearch size={18} />
                </Button>
              </form>
            </div>

            {/* روابط التنقل الأساسية */}
            <ul className="p-4 list-none border-t border-gray-50">
              {[
                { name: "Home", href: "/" },
                { name: "Shop", href: "/products" },
                { name: "Categories", href: "/categories" },
                { name: "Brands", href: "/brands" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={toggleNav}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* روابط Wishlist & Cart (الجديدة) */}
            <ul className="px-5 py-3 border-t border-b border-gray-100 list-none bg-gray-50/30">
              <li>
                <Link
                  href="/wishlist"
                  onClick={toggleNav}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-emerald-50 transition-colors"
                >
                  <div className="rounded-full w-8 h-8 flex items-center justify-center text-red-400 bg-red-100 text-lg">
                    <FaRegHeart size={16} />
                  </div>
                  Wishlist
                </Link>
              </li>
              <li className="mt-1">
                <Link
                  href="/cart"
                  onClick={toggleNav}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-gray-700 hover:bg-emerald-50 transition-colors"
                >
                  <div className="rounded-full w-8 h-8 flex items-center justify-center text-emerald-500 bg-emerald-100 text-lg">
                    <FaShoppingCart size={16} />
                  </div>
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* الجزء السفلي (Auth & Support) */}
          <div className="p-5 bg-white border-t border-gray-100">
            {status === "authenticated" ? (
              <div className="grid gap-2">
                <Link
                  href="/profile"
                  onClick={toggleNav}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 shadow-sm"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="w-full py-2.5 rounded-xl flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 font-bold transition-all"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={toggleNav}
                  className="rounded-xl py-2.5 flex items-center justify-center text-white bg-emerald-600 hover:bg-emerald-700 text-sm font-bold shadow-sm transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={toggleNav}
                  className="rounded-xl py-2.5 flex items-center justify-center text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-50 text-sm font-bold transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              href="/contact"
              onClick={toggleNav}
              className="mt-3 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-emerald-50 transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <TfiHeadphoneAlt className="text-emerald-600 text-base" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                  Need Help?
                </div>
                <div className="text-sm font-bold text-gray-800">
                  Contact Support
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}