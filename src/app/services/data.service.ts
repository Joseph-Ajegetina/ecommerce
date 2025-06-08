import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'api'; // This will be replaced with real API URL later

  constructor(private http: HttpClient) {}

  // Simulate API calls with local data for now
  // These methods will be updated to use real API endpoints later

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('assets/data.json');
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const product = products.find(p => p.slug === slug);
        observer.next(product);
        observer.complete();
      });
    });
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const filteredProducts = products.filter(p => p.category === category);
        observer.next(filteredProducts);
        observer.complete();
      });
    });
  }

  getNewProducts(): Observable<Product[]> {
    return new Observable(observer => {
      this.getAllProducts().subscribe(products => {
        const newProducts = products.filter(p => p.new);
        observer.next(newProducts);
        observer.complete();
      });
    });
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