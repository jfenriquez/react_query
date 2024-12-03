export interface ProductsInterface {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: Category | string;
  image: string;
  rating?: Rating;
}

export enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export interface Rating {
  rate: number;
  count: number;
}
