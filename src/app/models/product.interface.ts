export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  rating?: number;
  reviews?: ProductReview[];
}

export interface ProductReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
} 