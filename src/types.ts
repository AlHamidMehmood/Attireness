export interface Product {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  baseCurrency: 'PKR' | 'USD';
  category: string;
  image: string;
  description: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
}
