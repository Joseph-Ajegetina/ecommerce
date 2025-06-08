import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartDialogService } from '../services/cart-dialog.service';
import { Observable } from 'rxjs';
import { CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (dialogService.isOpen$ | async) {
      <div class="fixed inset-0 bg-black/50 z-40" (click)="close()"></div>
      <div class="fixed top-24 right-6 z-50 bg-white rounded-lg p-8 w-[377px]">
        <div class="flex justify-between items-center mb-8">
          <h6 class="text-h6">CART (@if (itemCount$ | async; as count) { {{ count }} })</h6>
          <button 
            class="text-black/50 hover:text-primary transition-colors underline"
            (click)="clearCart()">
            Remove all
          </button>
        </div>

        @if (cart$ | async; as cartItems) {
          @if (cartItems.length === 0) {
            <p class="text-center text-black/50 py-8">Your cart is empty</p>
          } @else {
            <div class="space-y-6 mb-8">
              @for (item of cartItems; track item.product.id) {
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
                  <div class="flex items-center bg-gray-light">
                    <button (click)="updateQuantity(item.product.id, item.quantity - 1)" 
                            class="px-4 py-2 text-black/50 hover:text-primary transition-colors">
                      -
                    </button>
                    <span class="w-8 text-center text-[13px] font-bold">{{ item.quantity }}</span>
                    <button (click)="updateQuantity(item.product.id, item.quantity + 1)" 
                            class="px-4 py-2 text-black/50 hover:text-primary transition-colors">
                      +
                    </button>
                  </div>
                </div>
              }
            </div>

            <div class="flex justify-between items-center mb-6">
              <span class="text-black/50 uppercase">Total</span>
              <span class="text-h6">$ {{ (total$ | async)?.toLocaleString() }}</span>
            </div>

            <a routerLink="/checkout"
               (click)="close()"
               class="block w-full bg-primary text-white text-center px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors">
              Checkout
            </a>
          }
        }
      </div>
    }
  `
})
export class CartComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  total$!: Observable<number>;
  itemCount$!: Observable<number>;

  constructor(
    private cartService: CartService,
    public dialogService: CartDialogService
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.total$ = this.cartService.getTotal();
    this.itemCount$ = this.cartService.getItemCount();
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  close() {
    this.dialogService.close();
  }
} 