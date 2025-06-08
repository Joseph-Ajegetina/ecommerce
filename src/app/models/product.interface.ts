export interface Product {
  id: number;
  slug: string;
  name: string;
  image: ProductImage;
  category: string;
  categoryImage: ProductImage;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: ProductInclude[];
  gallery: ProductGallery;
  others: ProductOther[];
}

export interface ProductImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductInclude {
  quantity: number;
  item: string;
}

export interface ProductGallery {
  first: ProductImage;
  second: ProductImage;
  third: ProductImage;
}

export interface ProductOther {
  slug: string;
  name: string;
  image: ProductImage;
}

export interface ProductReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: Date;
} 