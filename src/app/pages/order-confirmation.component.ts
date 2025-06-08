import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderConfirmationService } from '../services/order-confirmation.service';
import { OrderConfirmationModalService } from '../services/order-confirmation-modal.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" (click)="closeModal($event)">
      <div class="container mx-auto px-6">
        <div class="bg-white rounded-lg p-12 max-w-[540px] mx-auto" (click)="$event.stopPropagation()">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-8">
            <svg width="26" height="21" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.6 1.6l7.4 7.4L23.4 1.6" stroke="#FFF" stroke-width="3" fill="none"/>
            </svg>
          </div>

          <h1 class="text-[32px] font-bold tracking-[1.15px] leading-[36px] mb-6">
            THANK YOU<br>
            FOR YOUR ORDER
          </h1>

          <p class="text-[15px] text-black/50 mb-8">
            You will receive an email confirmation shortly.
          </p>

          @if (orderConfirmationService.orderItems$ | async; as orderItems) {
            <div class="bg-[#F1F1F1] rounded-lg overflow-hidden mb-12">
              <!-- Order Summary -->
              <div class="p-6">
                <!-- First Item -->
                @if (orderItems.length > 0) {
                  <div class="flex items-center gap-4 pb-3">
                    <img [src]="orderItems[0].product.image.desktop" 
                         [alt]="orderItems[0].product.name"
                         class="w-16 h-16 rounded-lg bg-[#F1F1F1] object-cover">
                    <div class="flex-1">
                      <h6 class="text-[15px] font-bold leading-[25px]">{{ orderItems[0].product.name }}</h6>
                      <p class="text-[14px] font-bold text-black/50">
                        $ {{ orderItems[0].product.price.toLocaleString() }}
                      </p>
                    </div>
                    <span class="text-[15px] text-black/50 font-bold">x{{ orderItems[0].quantity }}</span>
                  </div>

                  <!-- Divider -->
                  @if (orderItems.length > 1) {
                    <div class="w-full h-[1px] bg-black/10 my-3"></div>
                    <!-- Other Items Count -->
                    <div class="text-center">
                      <span class="text-[12px] font-bold text-black/50">
                        and {{ orderItems.length - 1 }} other item(s)
                      </span>
                    </div>
                  }
                }
              </div>

              <!-- Grand Total -->
              <div class="bg-black p-6">
                <span class="block text-[15px] text-white/50 mb-2">GRAND TOTAL</span>
                <span class="text-[18px] font-bold text-white">
                  $ {{ (orderConfirmationService.orderTotal$ | async)?.toLocaleString() }}
                </span>
              </div>
            </div>
          }

          <a routerLink="/"
             (click)="clearCartAndClose()"
             class="block w-full bg-primary text-white text-[13px] font-bold text-center px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  `
})
export class OrderConfirmationComponent {
  constructor(
    private cartService: CartService,
    public orderConfirmationService: OrderConfirmationService,
    private modalService: OrderConfirmationModalService
  ) {}

  clearCartAndClose() {
    this.cartService.clearCart();
    this.orderConfirmationService.clearOrderDetails();
    this.modalService.close();
  }

  closeModal(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.cartService.clearCart();
      this.orderConfirmationService.clearOrderDetails();
      this.modalService.close();
    }
  }
} 