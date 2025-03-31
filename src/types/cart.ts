
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
}

export interface Store {
  id: string;
  name: string;
  status: string;
  total: number;
  products: Product[];
}
