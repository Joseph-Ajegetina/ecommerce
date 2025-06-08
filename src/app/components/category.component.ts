import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService, Product } from '../services/data.service';
import { CategoryGridComponent } from './shared/category-grid.component';
import { AboutSectionComponent } from './shared/about-section.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryGridComponent, AboutSectionComponent],
  template: `
    <div class="bg-black py-16 md:py-24">
      <h1 class="text-white text-center text-[28px] md:text-h2 uppercase">{{ categoryName }}</h1>
    </div>

    <div class="container px-6 py-16 md:py-24">
      @if (isLoading) {
        <div class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      } @else {
        <div class="space-y-24 md:space-y-32">
          @for (product of products; track product.id; let i = $index) {
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32">
              <div [class.lg:order-2]="i % 2 === 1" class="bg-gray-light rounded-lg overflow-hidden">
                <picture>
                  <source [srcset]="product.categoryImage.desktop" media="(min-width: 1024px)">
                  <source [srcset]="product.categoryImage.tablet" media="(min-width: 768px)">
                  <img [src]="product.categoryImage.mobile" 
                       [alt]="product.name" 
                       class="w-full h-full object-cover">
                </picture>
              </div>
              <div [class.lg:order-1]="i % 2 === 1" class="flex items-center text-center lg:text-left">
                <div class="w-full lg:max-w-md">
                  @if (product.new) {
                    <p class="text-primary tracking-[10px] uppercase mb-4">New Product</p>
                  }
                  <h2 class="text-[28px] md:text-h2 uppercase mb-6 md:mb-8">{{ product.name }}</h2>
                  <p class="text-[15px] text-black/50 mb-6 md:mb-10">{{ product.description }}</p>
                  <a [routerLink]="['/product', product.slug]" 
                     class="bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors inline-block">
                    See Product
                  </a>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>

    <!-- Category Grid -->
    <app-category-grid />

    <!-- About Section -->
    <app-about-section />
  `,
  styles: []
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  products: Product[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.loadProducts(this.categoryName);
    });
  }

  private loadProducts(category: string) {
    this.isLoading = true;
    this.dataService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }
} 