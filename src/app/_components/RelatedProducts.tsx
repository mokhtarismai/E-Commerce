import { getRelatedProducts } from "../../services/AllProduct"; // مسار الـ service بتاعك
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./productCard";

export default async function RelatedProducts({
  categoryId,
  currentProductId,
}: {
  categoryId: string;
  currentProductId: string;
}) {
  // بننادي على الـ Service اللي لسه عاملينها
  const products = await getRelatedProducts(categoryId);

  if (!products) return null;

  // بنفلتر عشان المنتج اللي إحنا واقفين عليه ما يظهرش في السلايدر تحت
  const filteredProducts = products.filter((p) => p.id !== currentProductId);

  return (
    <div className="mt-16 pt-10 border-t border-gray-100">
     

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        {/* الهيدر: شايل العنوان والزراير مع بعض */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-8 bg-emerald-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">
              You May Also <span className="text-emerald-500">Like</span>
            </h2>
          </div>

          {/* الزراير هنا بقت فوق علي اليمين */}
          <div className="hidden md:flex items-center gap-2">
            <CarouselPrevious className="static translate-y-0 h-10 w-10 rounded-full border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" />
            <CarouselNext className="static translate-y-0 h-10 w-10 rounded-full border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" />
          </div>
        </div>

        <CarouselContent className="-ml-4">
          {filteredProducts.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <ProductCard item={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
