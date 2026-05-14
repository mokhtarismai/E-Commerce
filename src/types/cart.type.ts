import { ProductType } from "./product.type"; 

export interface CartResType {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    _id: string;
    cartOwner: string;
    products: CartItemType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
  };
}

export interface CartItemType {
  count: number;
  _id: string;
  product: ProductType;
  price: number;
}
