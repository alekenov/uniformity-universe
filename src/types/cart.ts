
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  unit?: string;
  image?: string;
  weight?: string;
  storeId?: string;
  storeName?: string;
}

export interface Store {
  id: string;
  name: string;
  status: string;
  total: number;
  products: Product[];
  address?: {
    street: string;
    city: string;
    entrance?: string;
    apartment?: string;
    floor?: string;
    intercom?: string;
  };
}
