"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function ProductImages({ 
  images, 
  title, 
  priceAfterDiscount 
}: { 
  images: string[], 
  title: string, 
  priceAfterDiscount?: any 
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="space-y-6 w-full bg-white rounded-2xl shadow-sm border border-gray-100 pb-7 ">
      <div className="relative  overflow-hidden">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="ml-0"> 
            {images.map((img, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="aspect-3/4 flex items-center justify-center w-full bg-white">
                  <img 
                    src={img} 
                    alt={`${title}-${index}`} 
                    className="w-full h-full object-contain p-2" 
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        
        {priceAfterDiscount && (
          <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md">
            SALE
          </span>
        )}
      </div>

      {/* الصور المصغرة */}
      <div className="grid grid-cols-4 gap-3 px-3">
        {images.slice(0, 4).map((img, i) => (
          <button
            key={i}
            onClick={() => api?.scrollTo(i)}
            className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${
              current === i 
                ? "border-emerald-500 ring-2 ring-emerald-50" 
                : "border-transparent bg-gray-50 opacity-70 hover:opacity-100"
            }`}
          >
            <img src={img} className="w-full h-full object-cover" alt={`thumb-${i}`} />
          </button>
        ))}
      </div>
    </div>
  );
}