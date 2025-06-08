import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { Product } from '../services/data.service';
import { Observable, map, switchMap, filter } from 'rxjs';
import { CategoryGridComponent } from './shared/category-grid.component';
import { AboutSectionComponent } from './shared/about-section.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryGridComponent, AboutSectionComponent],
  template: `
    <ng-container *ngIf="product$ | async as product">
      <div class="container mx-auto px-6 py-16">
        <button routerLink=".." class="text-black/50 mb-8 hover:text-primary transition-colors">
          Go Back
        </button>

        <!-- Product Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
          <img [src]="product.image.desktop" 
               [alt]="product.name"
               class="rounded-lg bg-gray-light w-full">
          
          <div class="flex flex-col justify-center">
            <span *ngIf="product.new" class="text-primary tracking-[10px] uppercase mb-4">New Product</span>
            <h1 class="text-h2 mb-8">{{ product.name }}</h1>
            <p class="text-black/50 mb-8">{{ product.description }}</p>
            <p class="text-h6 mb-8">$ {{ product.price.toLocaleString() }}</p>

            <div class="flex gap-4">
              <div class="flex items-center bg-gray-light">
                <button (click)="quantity = quantity - 1" 
                        [disabled]="quantity <= 1"
                        class="px-6 py-4 text-black/50 hover:text-primary transition-colors disabled:opacity-25">
                  -
                </button>
                <span class="w-12 text-center font-bold">{{ quantity }}</span>
                <button (click)="quantity = quantity + 1" 
                        class="px-6 py-4 text-black/50 hover:text-primary transition-colors">
                  +
                </button>
              </div>
              <button (click)="addToCart(product)"
                      class="bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
          <div class="lg:col-span-2">
            <h2 class="text-h3 mb-8">FEATURES</h2>
            <p class="text-black/50 whitespace-pre-line">{{ product.features }}</p>
          </div>
          <div>
            <h2 class="text-h3 mb-8">IN THE BOX</h2>
            <ul class="space-y-2">
              <li *ngFor="let item of product.includes; trackBy: trackByItem" class="flex gap-6">
                <span class="text-primary font-bold">{{ item.quantity }}x</span>
                <span class="text-black/50">{{ item.item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          <img [src]="product.gallery.first.desktop" 
               [alt]="product.name"
               class="rounded-lg w-full">
          <img [src]="product.gallery.second.desktop" 
               [alt]="product.name"
               class="rounded-lg w-full">
          <img [src]="product.gallery.third.desktop" 
               [alt]="product.name"
               class="rounded-lg w-full lg:col-span-2">
        </div>

        <!-- You May Also Like -->
        <ng-container *ngIf="product.others">
          <h2 class="text-h3 text-center mb-16">YOU MAY ALSO LIKE</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div *ngFor="let other of product.others; trackBy: trackBySlug" class="text-center">
              <img [src]="other.image.desktop" 
                   [alt]="other.name"
                   class="rounded-lg bg-gray-light w-full mb-8">
              <h3 class="text-h5 mb-8">{{ other.name }}</h3>
              <a [routerLink]="['/product', other.slug]"
                 class="inline-block bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors">
                See Product
              </a>
            </div>
          </div>
        </ng-container>

        <!-- Category Grid -->
        <app-category-grid />

        <!-- About Section -->
        <app-about-section />
      </div>
    </ng-container>
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product>;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.product$ = this.route.params.pipe(
      map(params => params['slug']),
      switchMap(slug => this.dataService.getProductBySlug(slug)),
      filter((product): product is Product => !!product)
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, this.quantity);
  }

  trackByItem(index: number, item: { item: string }) {
    return item.item;
  }

  trackBySlug(index: number, item: { slug: string }) {
    return item.slug;
  }
}
