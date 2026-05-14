import { BrandType } from "@/types/product.type";

export async function getBrands() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
    cache: "force-cache", // كاش لمدة ساعة
  });
  const data = await res.json();
  return data.data as BrandType[];
}


export const getSingleBrand = async (brandId: string) => {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data as BrandType; // هيرجع كائن البراند (name, image)
};