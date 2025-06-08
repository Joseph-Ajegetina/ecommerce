import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, Category } from '../../services/data.service';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="container px-6 py-24">
      <div class="grid grid-cols-3 gap-8">
        @for (category of categories; track category.slug) {
          <div class="bg-gray-light rounded-lg pt-[110px] pb-8 px-8 text-center relative group">
            <img [src]="category.image" 
                 [alt]="category.name" 
                 class="w-40 absolute left-1/2 -translate-x-1/2 -top-14">
            <h6 class="text-[18px] font-bold tracking-[1.3px] uppercase mb-4">{{ category.name }}</h6>
            <a [routerLink]="['/category', category.slug]" 
               class="text-black/50 uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors inline-flex items-center">
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