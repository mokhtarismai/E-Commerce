"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,  
} from "@/components/ui/carousel";
import sliderImg from "../assets/home-slider.png";
import Link from "next/link";
import { cn } from "@/lib/utils"; 

export default function HeroSlider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const greenOverlay =
    "color-mix(in oklab, var(--color-green-500) 70%, transparent)";

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="w-full group relative">
      <Carousel
        setApi={setApi} 
        opts={{ loop: true }}
        className="w-full overflow-hidden shadow-sm"
      >
        <CarouselContent className="pointer-events-none ml-0">
          {/* Item 1 */}
          <CarouselItem className="pl-0">
            <div className="relative h-62.5 md:h-100 w-full flex items-center overflow-hidden">
              <Image src={sliderImg} alt="Banner" fill priority className="object-cover object-right md:object-center" />
              <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(90deg, ${greenOverlay} 100%, color-mix(in oklab, var(--color-green-400) 50%, transparent) 50%, transparent 100%)` }} />
              <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-lg text-white select-none pointer-events-auto">
                  <h2 className="text-base md:text-3xl font-bold leading-tight mb-2 tracking-tight drop-shadow-sm">Fresh Products Delivered <br className="hidden md:block" /> to your Door</h2>
                  <p className="text-sm md:text-base mb-6 opacity-90 font-medium">Get 20% off your first order</p>
                  <div className="flex gap-4 items-center mt-2">
                    <Link href="/products" className="transition-transform duration-300 hover:scale-105 active:scale-95"><Button className="h-auto bg-white text-[#0aad0a] rounded-md px-6 py-3 text-sm md:text-base font-bold shadow-sm cursor-pointer">Shop Now</Button></Link>
                    <Link href="/" className="transition-transform duration-300 hover:scale-105 active:scale-95"><Button variant="outline" className="h-auto border border-white hover:text-white text-white hover:bg-white/0 rounded-md px-6 py-2 text-sm md:text-base font-bold bg-transparent shadow-none cursor-pointer">View Deals</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Item 2 */}
          <CarouselItem className="pl-0">
            <div className="relative h-62.5 md:h-100 w-full flex items-center overflow-hidden">
              <Image src={sliderImg} alt="Banner" fill priority className="object-cover object-right md:object-center" />
              <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(90deg, ${greenOverlay} 100%, color-mix(in oklab, var(--color-green-400) 50%, transparent) 50%, transparent 100%)` }} />
              <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-lg text-white select-none pointer-events-auto">
                  <h2 className="text-base md:text-3xl font-bold leading-tight mb-2 tracking-tight drop-shadow-sm">Premium Quality <br className="hidden md:block" /> Guaranteed</h2>
                  <p className="text-sm md:text-base mb-6 opacity-90 font-medium">Fresh from farm to your table</p>
                  <div className="flex gap-4 items-center mt-2">
                    <Link href="/products" className="transition-transform duration-300 hover:scale-105 active:scale-95"><Button className="h-auto bg-white text-blue-500 rounded-md px-6 py-3 text-sm md:text-base font-bold shadow-sm cursor-pointer">Shop Now</Button></Link>
                    <Link href="/" className="transition-transform duration-300 hover:scale-105 active:scale-95"><Button variant="outline" className="h-auto border border-white hover:text-white text-white hover:bg-white/0 rounded-md px-6 py-2 text-sm md:text-base font-bold bg-transparent shadow-none cursor-pointer">Learn More</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Item 3 */}
          <CarouselItem className="pl-0">
            <div className="relative h-62.5 md:h-100 w-full flex items-center overflow-hidden">
              <Image src={sliderImg} alt="Banner" fill priority className="object-cover object-right md:object-center" />
              <div className="absolute inset-0 z-10" style={{ background: `linear-gradient(90deg, ${greenOverlay} 100%, color-mix(in oklab, var(--color-green-400) 50%, transparent) 50%, transparent 100%)` }} />
              <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-lg text-white select-none pointer-events-auto">
                  <h2 className="text-base md:text-3xl font-bold leading-tight mb-2 tracking-tight drop-shadow-sm">Fast & Free Delivery</h2>
                  <p className="text-sm md:text-base mb-6 opacity-90 font-medium">Same day delivery available</p>
                  <div className="flex gap-4 items-center mt-2">
                    <Link href="/products" className="transition-transform duration-300 hover:scale-105 active:scale-95"><Button className="h-auto bg-white text-blue-500 rounded-md px-6 py-3 text-sm md:text-base font-bold shadow-sm cursor-pointer">Order Now</Button></Link>
                    <Link href="/" className="transition-transform duration-300 hover:scale-105 active:scale-95"><Button variant="outline" className="h-auto border border-white hover:text-white text-white hover:bg-white/0 rounded-md px-6 py-2 text-sm md:text-base font-bold bg-transparent shadow-none cursor-pointer">Delivery Info</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious className="pointer-events-auto z-50 left-4 h-10 w-10 bg-white/20 border-none text-white  group-hover:opacity-100 transition-all cursor-pointer active:translate-y-[-50%] translate-y-[-50%]!" />
        <CarouselNext className="pointer-events-auto z-50 right-4 h-10 w-10 bg-white/20 border-none text-white  group-hover:opacity-100 transition-all cursor-pointer active:translate-y-[-50%] translate-y-[-50%]!" />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 bg-white/50 cursor-pointer",
                current === index ? "w-8 bg-white" : "w-2 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}