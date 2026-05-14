import { ProductType } from "./../types/product.type";


export async function getAllProducts(categoryId?: string, brandId?: string): Promise<ProductType[] | null> {
  try {
    let url = `https://ecommerce.routemisr.com/api/v1/products`;
    const params = new URLSearchParams();

    if (categoryId) params.append("category[in]", categoryId);
    if (brandId) params.append("brand", brandId); 

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const res = await fetch(url, {
      cache: "force-cache",
    });

    const finalRes = await res.json();
    return finalRes.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    return null;
  }
}

export async function getProductById(id:string) : Promise< ProductType | null > {
  try {
         const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
        cache: "force-cache",
      });

      const finalRes = await res.json();

    console.log(finalRes.data);

    return finalRes.data;
    
  } catch (error) {
    console.log(error);
    return null
    
    
  }
  
}

export async function getRelatedProducts(categoryId: string): Promise<ProductType[] | null> {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`, {
      cache: "force-cache",
    });

    const finalRes = await res.json();
    return finalRes.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}