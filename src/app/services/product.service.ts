import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      imageUrl: 'assets/images/headphones.jpg',
      category: 'Electronics',
      stock: 50,
      rating: 4.5
    },
    {
      id: '2',
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 299.99,
      imageUrl: 'assets/images/smartwatch.jpg',
      category: 'Electronics',
      stock: 30,
      rating: 4.3
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      description: 'Durable laptop backpack with multiple compartments',
      price: 79.99,
      imageUrl: 'assets/images/backpack.jpg',
      category: 'Accessories',
      stock: 100,
      rating: 4.7
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProduct(id: string): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  searchProducts(query: string): Observable<Product[]> {
    const searchTerm = query.toLowerCase();
    return of(this.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    ));
  }
}
