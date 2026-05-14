import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-20">
      {/* 1. Main Product Section (الصورة والتفاصيل) */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* الجزء الشمال: الصور */}
        <div className="w-full lg:w-1/3 space-y-4">
          {/* الصورة الكبيرة */}
          <Skeleton className="aspect-square w-full rounded-2xl bg-gray-100" />
          
          {/* الصور الصغيرة تحتها */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg bg-gray-100" />
            ))}
          </div>
        </div>

        {/* الجزء اليمين: تفاصيل المنتج */}
        <div className="w-full lg:w-1/2 space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" /> {/* Category */}
              <Skeleton className="h-6 w-20 rounded-full" /> {/* Brand */}
            </div>
            <Skeleton className="h-10 w-3/4 rounded-lg" /> {/* Title */}
            <Skeleton className="h-6 w-1/4 rounded-md" />  {/* Rating */}
          </div>

          <div className="space-y-4 py-6 border-y border-gray-50">
            <Skeleton className="h-8 w-32 rounded-lg" /> {/* Price */}
            <Skeleton className="h-24 w-full rounded-xl" /> {/* Description */}
          </div>

          {/* الزراير والكمية */}
          <div className="flex gap-4 items-center pt-4">
            <Skeleton className="h-12 w-32 rounded-xl" /> {/* Quantity selector */}
            <Skeleton className="h-12 flex-1 rounded-xl" /> {/* Add to cart button */}
          </div>
          
          <div className="flex gap-4">
             <Skeleton className="h-10 flex-1 rounded-lg" />
             <Skeleton className="h-10 flex-1 rounded-lg" />
          </div>
        </div>
      </div>

      {/* 2. Related Products Section (السلايدر اللي تحت) */}
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1.5 bg-emerald-500 rounded-full" />
            <Skeleton className="h-8 w-48 rounded-md" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full rounded-2xl bg-gray-50" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/3 rounded" />
                <Skeleton className="h-5 w-full rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}