import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Product {
  id: number;
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: string;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    second: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    third: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  };
  others: Array<{
    slug: string;
    name: string;
    image: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }>;
}

export interface Category {
  name: string;
  image: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly categories: Category[] = [
    {
      name: 'Headphones',
      image: 'assets/shared/desktop/image-category-thumbnail-headphones.png',
      slug: 'headphones'
    },
    {
      name: 'Speakers',
      image: 'assets/shared/desktop/image-category-thumbnail-speakers.png',
      slug: 'speakers'
    },
    {
      name: 'Earphones',
      image: 'assets/shared/desktop/image-category-thumbnail-earphones.png',
      slug: 'earphones'
    }
  ];

  constructor(private http: HttpClient) {}

  getCategories(): Category[] {
    return this.categories;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/data.json');
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.category === category))
    );
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.getAllProducts().pipe(
      map(products => products.find(product => product.slug === slug))
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.new))
    );
  }

  // This method will help with pagination later when using real API
  getProductsPaginated(page: number, limit: number): Observable<Product[]> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const start = (page - 1) * limit;
        const paginatedProducts = products.slice(start, start + limit);
        observer.next(paginatedProducts);
        observer.complete();
      });
    });
  }
} 