import { getAllProducts } from "@/services/AllProduct";
import ProductCard from "./_components/productCard";
import React, { lazy, Suspense } from "react";
import HeroSlider from "./_components/hero-slider";
import Features from "./_components/features";
import PromoBanners from "./_components/PromoBanners";
import Loading from "./loading";
import Newsletter from "./_components/Newsletter";

const ShopByCategoryLazy = lazy(() => import("./_components/ShopByCategory"));

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main>
      <HeroSlider />
      <Features />
      <Suspense fallback={<Loading />}>
        <ShopByCategoryLazy />
      </Suspense>
      <PromoBanners />
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h2 className="text-3xl font-bold text-gray-800">
            Featured <span className="text-emerald-600">Products</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </section>
      <Newsletter />
    </main>
  );
}
