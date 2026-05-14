import { CategoryType } from "../types/product.type"; // عدل المسار حسب مشروعك

export const getAllCategories = async (): Promise<CategoryType[]> => {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
  cache: "force-cache"
});
    const result = await res.json();
    
    return result.data; 
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};