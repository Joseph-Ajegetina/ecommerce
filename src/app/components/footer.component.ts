import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">About Us</h3>
            <p class="text-gray-300">
              Your trusted source for quality products and excellent service.
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li>
                <a routerLink="/products" class="text-gray-300 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a routerLink="/cart" class="text-gray-300 hover:text-white">
                  Shopping Cart
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-300">
              <li>Email: info@eshop.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 E-commerce St</li>
            </ul>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 E-Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {

}
