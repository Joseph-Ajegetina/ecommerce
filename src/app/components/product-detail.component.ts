import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService, Product } from '../services/data.service';
import { CategoryGridComponent } from './shared/category-grid.component';
import { AboutSectionComponent } from './shared/about-section.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryGridComponent, AboutSectionComponent],
  template: `
    <div class="container px-6 py-16">
      <button (click)="goBack()" class="text-black/50 hover:text-primary transition-colors">
        Go Back
      </button>
    </div>

    @if (isLoading) {
      <div class="container px-6">
        <div class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    } @else if (product) {
      <!-- Product Overview -->
      <section class="container px-6 mb-32">
        <div class="grid grid-cols-2 gap-32">
          <div class="bg-gray-light rounded-lg overflow-hidden">
            <img [src]="product.image.desktop" [alt]="product.name" class="w-full h-full object-cover">
          </div>
          <div class="flex items-center">
            <div class="max-w-md">
              @if (product.new) {
                <p class="text-primary tracking-[10px] uppercase mb-4">New Product</p>
              }
              <h2 class="text-h2 uppercase mb-8">{{ product.name }}</h2>
              <p class="text-body text-black/50 mb-8">{{ product.description }}</p>
              <p class="text-h6 mb-8">$ {{ product.price.toLocaleString() }}</p>
              
              <!-- Add to Cart Section -->
              <div class="flex gap-4">
                <div class="flex items-center bg-gray-light">
                  <button (click)="decrementQuantity()" 
                          class="px-6 py-4 text-black/50 hover:text-primary transition-colors">
                    -
                  </button>
                  <span class="w-12 text-center">{{ quantity }}</span>
                  <button (click)="incrementQuantity()" 
                          class="px-6 py-4 text-black/50 hover:text-primary transition-colors">
                    +
                  </button>
                </div>
                <button (click)="addToCart()" 
                        class="bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="container px-6 mb-32">
        <div class="grid grid-cols-2 gap-32">
          <div>
            <h3 class="text-h3 uppercase mb-8">Features</h3>
            <div class="text-body text-black/50 whitespace-pre-line">{{ product.features }}</div>
          </div>
          <div>
            <h3 class="text-h3 uppercase mb-8">In the Box</h3>
            <ul class="space-y-2">
              @for (item of product.includes; track item.item) {
                <li class="flex gap-6">
                  <span class="text-primary font-bold">{{ item.quantity }}x</span>
                  <span class="text-black/50">{{ item.item }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </section>

      <!-- Gallery -->
      <section class="container px-6 mb-32">
        <div class="grid grid-cols-2 gap-8">
          <div class="space-y-8">
            <img [src]="product.gallery.first.desktop" [alt]="product.name" class="rounded-lg w-full">
            <img [src]="product.gallery.second.desktop" [alt]="product.name" class="rounded-lg w-full">
          </div>
          <div>
            <img [src]="product.gallery.third.desktop" [alt]="product.name" class="rounded-lg w-full h-full object-cover">
          </div>
        </div>
      </section>

      <!-- You May Also Like -->
      <section class="container px-6 mb-32">
        <h3 class="text-h3 uppercase text-center mb-16">You May Also Like</h3>
        <div class="grid grid-cols-3 gap-8">
          @for (other of product.others; track other.slug) {
            <div class="text-center">
              <div class="bg-gray-light rounded-lg mb-8">
                <img [src]="other.image.desktop" [alt]="other.name" class="w-full">
              </div>
              <h5 class="text-h5 uppercase mb-8">{{ other.name }}</h5>
              <a [routerLink]="['/product', other.slug]" 
                 class="bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors inline-block">
                See Product
              </a>
            </div>
          }
        </div>
      </section>

      <!-- Category Grid -->
      <app-category-grid />

      <!-- About Section -->
      <app-about-section />
    }
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  isLoading = true;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      this.loadProduct(slug);
    });
  }

  private loadProduct(slug: string) {
    this.isLoading = true;
    this.dataService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.isLoading = false;
      }
    });
  }

  goBack() {
    window.history.back();
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    // TODO: Implement cart functionality
    console.log('Adding to cart:', this.product?.name, 'Quantity:', this.quantity);
  }
}
