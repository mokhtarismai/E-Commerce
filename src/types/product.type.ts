export interface ProductType {
  id: string;
  title: string;
  imageCover: string;
  description: string;
  price: number;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  priceAfterDiscount?: number;
  quantity : number;
  subcategory : string;
  category: CategoryType;
  brand: BrandType;
}

export interface CategoryType {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string; 
  updatedAt?: string
}

export interface BrandType {
  _id: string;
  name: string;
  slug: string;
  image: string;
}