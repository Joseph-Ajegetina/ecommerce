import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../services/cart.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-light py-16">
      <div class="container mx-auto px-6">
        <div class="bg-white rounded-lg p-12 max-w-[540px] mx-auto">
          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <circle fill="#D87D4A" cx="32" cy="32" r="32"/>
              <path stroke="#FFF" strokeWidth="4" d="m20.754 33.333 6.751 6.751 15.804-15.803"/>
            </g>
          </svg>

          <h1 class="text-h3 my-8">
            THANK YOU<br>
            FOR YOUR ORDER
          </h1>

          <p class="text-black/50 mb-8">
            You will receive an email confirmation shortly.
          </p>

          @if (cart$ | async; as cartItems) {
            <div class="bg-gray-light rounded-lg overflow-hidden mb-8">
              <div class="p-6">
                <div class="space-y-4">
                  @for (item of cartItems.slice(0, 1); track item.product.id) {
                    <div class="flex items-center gap-4">
                      <img [src]="item.product.image.desktop" 
                           [alt]="item.product.name"
                           class="w-16 h-16 rounded-lg bg-gray-light">
                      <div class="flex-1">
                        <h6 class="text-[15px] font-bold">{{ item.product.name }}</h6>
                        <p class="text-[14px] font-bold text-black/50">
                          $ {{ item.product.price.toLocaleString() }}
                        </p>
                      </div>
                      <span class="text-black/50">x{{ item.quantity }}</span>
                    </div>
                  }
                </div>

                @if (cartItems.length > 1) {
                  <div class="mt-4 pt-4 border-t text-center text-black/50">
                    and {{ cartItems.length - 1 }} other item(s)
                  </div>
                }
              </div>

              <div class="bg-black p-6">
                <div class="text-white/50 uppercase mb-2">Grand Total</div>
                <div class="text-white text-h6">
                  $ {{ ((total$ | async) || 0 + 50)?.toLocaleString() }}
                </div>
              </div>
            </div>
          }

          <a routerLink="/"
             class="block w-full bg-primary text-white text-center px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmationComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  total$!: Observable<number>;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.total$ = this.cartService.getTotal();

    // Clear cart after showing the confirmation
    setTimeout(() => {
      this.cartService.clearCart();
    }, 0);
  }
} 