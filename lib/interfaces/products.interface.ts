// Generated by https://quicktype.io

export interface ProductsResponse {
  id: number;
  title: string;
  description: string;
  price: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  images: Image[];
  category: Category;
}

export interface Category {
  id: number;
  name: string;
}

export interface Image {
  id: number;
  url: string;
}

export interface AddProductToCart {
  quantity: number;
  productId: number;
}

// Generated by https://quicktype.io

export interface CartResponse {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
  userId: number;
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  images: Image[];
}

export interface ProductToDelete {
  id: number;
  productId: number;
  quantity: number;
}

// Generated by https://quicktype.io

// Generated by https://quicktype.io

export interface PurchasesResponse {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  productId: number;
  userId: number;
  product: Product;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  brand: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  images: Image[];
}

export interface Image {
  id: number;
  url: string;
}
