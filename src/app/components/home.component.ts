import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService, Category, Product } from '../services/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  featuredProduct?: Product;
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Get categories
    this.categories = this.dataService.getCategories();

    // Get featured product (first new product)
    this.dataService.getFeaturedProducts().subscribe({
      next: (products) => {
        if (products.length > 0) {
          this.featuredProduct = products[0];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      }
    });
  }
} 