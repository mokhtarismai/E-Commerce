"use client";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getAllCategories } from "@/services/getAllcategories";
import { CategoryType } from "@/types/product.type";
import Link from "next/link";
import Image from "next/image";
import { FiMail, FiSearch, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { FaGift, FaTruck, FaCartShopping, FaPhone } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { HiMiniUserPlus } from "react-icons/hi2";
import { PiHeadsetFill } from "react-icons/pi";
import logoImg from "../assets/freshcart-logo.49f1b44d.svg";
import { CgProfile } from "react-icons/cg";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import NavMenu from "./NavMenu";
import { CartContext } from "../_context/ContextCart";
import { useWishlist } from "../_context/WishlistContext";

const Navbar: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const context = useContext(CartContext);
  const { wishlistCount } = useWishlist();

  // لو الكونتنت مش موجود، مش هيكمل وهيرجع null أو Loading
  if (!context) return null;

  // دلوقتي TypeScript عرف إن context مش null ويقدر يقرأ البيانات
  const { cartCount, totalPriceOfCart } = context;

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getAllCategories();
      if (data) setCategories(data);
    };
    fetchCats();
  }, []);
  const { data: session, status } = useSession();
  const isUser = status === "authenticated";
  return (
    <>
      {/* --- 1. Top Bar --- */}
      <div className=" py-2 hidden lg:block text-[#5c6c75] border-b border-gray-100 relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center text-[13px]">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2 text-[14px] font-medium">
              <FaTruck size={14} className="text-[#0aad0a]" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-2 text-[14px] font-medium">
              <FaGift size={14} className="text-[#0aad0a] " />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link
              href="tel:+18001234567"
              className="text-[14px] font-medium flex items-center gap-1.5 hover:text-[#0aad0a] transition-colors"
            >
              <FaPhone size={14} /> +1 (800) 123-4567
            </Link>
            <Link
              href="mailto:support@freshcart.com"
              className="text-sm font-medium flex items-center gap-1.5 hover:text-[#0aad0a] transition-colors"
            >
              <FiMail size={14} /> support@freshcart.com
            </Link>
            <div className="flex items-center gap-4 ml-2 border-l border-gray-300 pl-4">
              {status === "loading" ? (
                // Skeleton بسيط عشان المساحة متتحركش
                <div className="h-4 w-20 bg-gray-200 animate-pulse rounded"></div>
              ) : status === "authenticated" ? (
                // رسالة ترحيب باسم المستخدم لما يسجل دخول
                <Link
                  href="/profile"
                  className="text-sm font-medium hover:text-[#0aad0a] flex items-center gap-1.5 transition-colors"
                >
                  <CiUser size={18} /> Hi, {session?.user?.name?.split(" ")[0]}
                </Link>
              ) : (
                // أزرار التسجيل العادية لو مش مسجل
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium hover:text-[#0aad0a] flex items-center gap-1.5 transition-colors"
                  >
                    <CiUser /> Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="text-sm font-medium hover:text-[#0aad0a] flex items-center gap-1.5 transition-colors"
                  >
                    <HiMiniUserPlus /> Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- 2. Main Navbar (Sticky Section) --- */}
      <nav className="sticky top-0 z-50  border-b border-gray-100 shadow-sm before:absolute before:inset-0 before:backdrop-blur-md before:-z-10 bg-white/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src={logoImg}
              alt="FreshCart Logo"
              width={160}
              height={40}
              priority
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="grow max-w-xl relative hidden md:block">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors shadow-sm">
              <FiSearch size={16} />
            </button>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6">
              <NavigationMenu>
                <NavigationMenuList className="gap-7">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="font-medium text-[#21313c] text-[16px] hover:text-[#0aad0a] transition-colors p-2"
                      >
                        Home
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/products"
                        className="font-medium text-[#21313c] text-[16px] hover:text-[#0aad0a] transition-colors"
                      >
                        Shop
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="cursor-pointer p-0 h-auto bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent font-medium text-[#21313c] text-[16px] hover:text-[#0aad0a] transition-colors">
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {/* حاوية القائمة - شيلنا الصور وخليناها قائمة نصوص بسيطة */}
                      <ul className="flex flex-col w-60 gap-1 p-3 bg-white shadow-xl rounded-xl border border-gray-100">
                        {/* 1. لينك ثابت لجميع الفئات */}
                        <li>
                          <Link
                            href="/categories" // بيروح لصفحة المنتجات بدون فلتر
                            className="block px-4 py-2.5 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border-b border-gray-50"
                          >
                            All Categories
                          </Link>
                        </li>

                        {/* 2. فلترة وعرض الـ 4 فئات المطلوبة */}
                        {categories
                          // هنا بنفلتر عشان نجيب بس الفئات اللي اسمها موجود في القائمة دي
                          ?.filter((cat) =>
                            [
                              "Electronics",
                              "Women's Fashion",
                              "Men's Fashion",
                              "Beauty & Health",
                            ].includes(cat.name),
                          )
                          .map((cat) => (
                            <li key={cat._id}>
                              <Link
                                // بنبعت اليوزر لـ /shop ومعاه الـ ID بتاع الكاتيجوري في الـ URL
                                href={`/products?category=${cat._id}`}
                                className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#0aad0a] rounded-lg transition-colors"
                              >
                                {/* عرض الاسم فقط بدون صورة */}
                                {cat.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/brands"
                        className="font-medium text-[#21313c] text-[16px] hover:text-[#0aad0a] transition-colors"
                      >
                        Brands
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="h-8 w-px bg-gray-200 hidden xl:block"></div>

            <div className="flex items-center gap-5">
              <div className="hidden xl:flex items-center gap-2 mr-2">
                <div className="bg-[#f0f3f2] p-2.5 rounded-full">
                  <PiHeadsetFill className="text-[#0aad0a]" size={22} />
                </div>
                <div className="text-[11px] leading-tight">
                  <p className="text-gray-500 font-light text-xs">Support</p>
                  <p className="font-bold text-[#21313c] text-xs">24/7 Help</p>
                </div>
              </div>

              <Link
                href="/wishlist"
                className="text-gray-600 hover:text-[#0aad0a] transition-colors relative"
              >
                <FiHeart size={21} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="text-gray-600 hover:text-[#0aad0a] transition-colors relative"
              >
                <FaCartShopping size={21} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#16a34a] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <NavMenu />

              {status === "loading" ? (
                <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-full"></div>
              ) : status === "authenticated" ? (
                <>
                  {/* أزرار البروفايل والlogout تظهر فقط لو مسجل دخول */}
                  <Link
                    href="/profile"
                    className="hidden lg:flex items-center gap-2 px-2 py-2 rounded-full  hover:bg-gray-100 text-gray-600 hover:text-[#16a34a] font-semibold transition-all text-2xl"
                  >
                    <CgProfile />
                  </Link>
                  <button
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/login" })
                    } // دالة تسجيل الخروج
                    className="cursor-pointer hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold transition-all shadow-sm"
                  >
                    <FiLogOut size={18} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold transition-all shadow-sm"
                  >
                    <FiUser size={18} />
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
