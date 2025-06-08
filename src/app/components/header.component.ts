import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartDialogService } from '../services/cart-dialog.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="bg-black">
      <nav class="container mx-auto px-6 py-8 flex items-center justify-between border-b border-white/10">
        <a routerLink="/" class="text-2xl font-bold text-white">audiophile</a>
        
        <div class="flex items-center space-x-8">
          <a routerLink="/" class="text-white hover:text-primary transition-colors">HOME</a>
          <a routerLink="/category/headphones" class="text-white hover:text-primary transition-colors">HEADPHONES</a>
          <a routerLink="/category/speakers" class="text-white hover:text-primary transition-colors">SPEAKERS</a>
          <a routerLink="/category/earphones" class="text-white hover:text-primary transition-colors">EARPHONES</a>
        </div>

        <button 
          (click)="openCart()"
          class="relative text-white hover:text-primary transition-colors">
          <svg width="23" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.625 15.833c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.054-.935-2.054-2.083 0-1.15.922-2.084 2.054-2.084zm9.857 0c1.132 0 2.054.935 2.054 2.084 0 1.148-.922 2.083-2.054 2.083-1.132 0-2.053-.935-2.053-2.083 0-1.15.92-2.084 2.053-2.084zm-9.857 1.39a.69.69 0 00-.685.694.69.69 0 00.685.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zm9.857 0a.69.69 0 00-.684.694.69.69 0 00.684.694.69.69 0 00.685-.694.69.69 0 00-.685-.695zM4.717 0c.316 0 .59.215.658.517l.481 2.122h16.47a.68.68 0 01.538.262c.127.166.168.38.11.579l-2.695 9.236a.672.672 0 01-.648.478H7.41a.667.667 0 00-.673.66c0 .364.303.66.674.66h12.219c.372 0 .674.295.674.66 0 .364-.302.66-.674.66H7.412c-1.115 0-2.021-.889-2.021-1.98 0-.812.502-1.511 1.218-1.816L4.176 1.32H.674A.667.667 0 010 .66C0 .296.302 0 .674 0zm16.716 3.958H6.156l1.797 7.917h11.17l2.31-7.917z" 
                  fill="currentColor" 
                  fillRule="nonzero"/>
          </svg>
          @if ((cartService.getItemCount() | async) || 0; as count) {
            @if (count > 0) {
              <span class="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {{ count }}
              </span>
            }
          }
        </button>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  constructor(
    public cartService: CartService,
    private dialogService: CartDialogService
  ) {}

  openCart() {
    this.dialogService.open();
  }
} 