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
      <div class="container mx-auto px-6 py-4 md:py-8 lg:py-12">
        <button routerLink=".." class="text-black/50 mb-6 hover:text-primary transition-colors">
          Go Back
        </button>

        <!-- Product Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mb-24">
          <div class="bg-gray-light rounded-lg overflow-hidden">
            <picture>
              <source [srcset]="product.image.desktop" media="(min-width: 1024px)">
              <source [srcset]="product.image.tablet" media="(min-width: 768px)">
              <img [src]="product.image.mobile" 
                   [alt]="product.name"
                   class="w-full h-full object-cover">
            </picture>
          </div>
          
          <div class="flex flex-col justify-center text-center md:text-left">
            @if (product.new) {
              <p class="text-primary tracking-[10px] uppercase mb-4 text-[14px]">New Product</p>
            }
            <h1 class="text-[28px] md:text-[40px] font-bold tracking-[1px] md:tracking-[1.5px] uppercase mb-6 leading-[1.1]">
              {{ formatProductName(product.name) }}
            </h1>
            <p class="text-[15px] text-black/50 leading-[25px] mb-6">{{ product.description }}</p>
            <p class="text-[18px] font-bold tracking-[1.3px] mb-8">$ {{ product.price.toLocaleString() }}</p>

            <div class="flex flex-row justify-center md:justify-start gap-4">
              <div class="flex items-center bg-gray-light h-12">
                <button (click)="quantity = quantity - 1" 
                        [disabled]="quantity <= 1"
                        class="w-12 text-black/50 hover:text-primary transition-colors disabled:opacity-25 text-[13px] font-bold">
                  -
                </button>
                <span class="w-12 text-center text-[13px] font-bold">{{ quantity }}</span>
                <button (click)="quantity = quantity + 1" 
                        class="w-12 text-black/50 hover:text-primary transition-colors text-[13px] font-bold">
                  +
                </button>
              </div>
              <button (click)="addToCart(product)"
                      class="bg-primary text-white h-12 px-8 uppercase tracking-[1px] hover:bg-primary-light transition-colors text-[13px] font-bold">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <!-- Features and In The Box -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-y-8 lg:gap-x-16 mb-24">
          <div class="lg:col-span-2">
            <h2 class="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase mb-6">FEATURES</h2>
            <p class="text-[15px] text-black/50 leading-[25px] whitespace-pre-line">{{ product.features }}</p>
          </div>
          <div>
            <h2 class="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase mb-6">IN THE BOX</h2>
            <ul class="space-y-2">
              @for (item of product.includes; track item.item) {
                <li class="flex gap-6">
                  <span class="text-primary font-bold text-[15px]">{{ item.quantity }}x</span>
                  <span class="text-black/50 text-[15px]">{{ item.item }}</span>
                </li>
              }
            </ul>
          </div>
        </div>

        <!-- Gallery -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-5 mb-24">
          <div class="md:col-span-5 space-y-5">
            <picture>
              <source [srcset]="product.gallery.first.desktop" media="(min-width: 1024px)">
              <source [srcset]="product.gallery.first.tablet" media="(min-width: 768px)">
              <img [src]="product.gallery.first.mobile" 
                   [alt]="product.name"
                   class="rounded-lg w-full">
            </picture>
            <picture>
              <source [srcset]="product.gallery.second.desktop" media="(min-width: 1024px)">
              <source [srcset]="product.gallery.second.tablet" media="(min-width: 768px)">
              <img [src]="product.gallery.second.mobile" 
                   [alt]="product.name"
                   class="rounded-lg w-full">
            </picture>
          </div>
          <div class="md:col-span-7">
            <picture>
              <source [srcset]="product.gallery.third.desktop" media="(min-width: 1024px)">
              <source [srcset]="product.gallery.third.tablet" media="(min-width: 768px)">
              <img [src]="product.gallery.third.mobile" 
                   [alt]="product.name"
                   class="rounded-lg w-full h-full object-cover">
            </picture>
          </div>
        </div>

        <!-- You May Also Like -->
        @if (product.others) {
          <div class="mb-24">
            <h2 class="text-[24px] md:text-[32px] font-bold tracking-[0.86px] md:tracking-[1.14px] uppercase text-center mb-10">YOU MAY ALSO LIKE</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-3 lg:gap-8">
              @for (other of product.others; track other.slug) {
                <div class="text-center">
                  <picture>
                    <source [srcset]="other.image.desktop" media="(min-width: 1024px)">
                    <source [srcset]="other.image.tablet" media="(min-width: 768px)">
                    <img [src]="other.image.mobile" 
                         [alt]="other.name"
                         class="rounded-lg bg-gray-light w-full mb-8">
                  </picture>
                  <h3 class="text-[24px] font-bold tracking-[1.7px] uppercase mb-8">{{ other.name }}</h3>
                  <a [routerLink]="['/product', other.slug]"
                     class="bg-primary text-white h-12 px-8 uppercase tracking-[1px] hover:bg-primary-light transition-colors inline-flex items-center justify-center text-[13px] font-bold">
                    See Product
                  </a>
                </div>
              }
            </div>
          </div>
        }

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

  formatProductName(name: string): string {
    // Split the name at appropriate points for line breaks
    const words = name.split(' ');
    if (words.length <= 2) return name;

    // For products like "YX1 WIRELESS EARPHONES"
    if (words[1] === 'WIRELESS' || words[1] === 'MARK') {
      return `${words[0]} ${words[1]}\n${words.slice(2).join(' ')}`;
    }

    // For other product names, split after the second word
    return `${words.slice(0, 2).join(' ')}\n${words.slice(2).join(' ')}`;
  }
}
