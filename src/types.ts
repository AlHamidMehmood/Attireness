export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}
