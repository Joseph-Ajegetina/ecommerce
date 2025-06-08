import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, Category } from '../../services/data.service';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="container px-6 py-16 md:py-24">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-x-3 lg:gap-x-8">
        @for (category of categories; track category.slug) {
          <div class="bg-gray-light rounded-lg pt-[88px] pb-6 px-4 text-center relative group">
            <img [src]="category.image" 
                 [alt]="category.name" 
                 class="w-32 md:w-36 absolute left-1/2 -translate-x-1/2 -top-12 transition-transform group-hover:scale-105">
            <h6 class="text-[15px] font-bold tracking-[1.3px] uppercase mb-4">{{ category.name }}</h6>
            <a [routerLink]="['/category', category.slug]" 
               class="text-black/50 uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors inline-flex items-center justify-center">
              Shop <span class="ml-2 text-primary">›</span>
            </a>
          </div>
        }
      </div>
    </section>
  `
})
export class CategoryGridComponent {
  categories: Category[] = [];

  constructor(private dataService: DataService) {
    this.categories = this.dataService.getCategories();
  }
} 