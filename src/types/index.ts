
export interface ProductDetails {
  label: string;
  value: string | number;
}

export interface Product {
  id: number;
  article: string;
  title: string;    
  image: string;
  price: number;
  amount: number;
  description: string;
  details: ProductDetails[];
  badge: boolean;
}

export interface PAGE_LINK {
    href:  string;
    label: string;
}