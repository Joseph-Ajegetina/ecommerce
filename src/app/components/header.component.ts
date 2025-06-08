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
        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-white hover:text-primary transition-colors" (click)="toggleMobileMenu()">
          <svg width="16" height="15" xmlns="http://www.w3.org/2000/svg">
            <g fill="currentColor" fill-rule="evenodd">
              <path d="M0 0h16v3H0zM0 6h16v3H0zM0 12h16v3H0z"/>
            </g>
          </svg>
        </button>

        <a routerLink="/" class="text-2xl font-bold text-white">
          <img src="assets/shared/desktop/logo.svg" alt="audiophile" class="h-6">
        </a>
        
        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <a routerLink="/" class="text-white hover:text-primary transition-colors text-[13px] tracking-[2px] uppercase">HOME</a>
          <a routerLink="/category/headphones" class="text-white hover:text-primary transition-colors text-[13px] tracking-[2px] uppercase">HEADPHONES</a>
          <a routerLink="/category/speakers" class="text-white hover:text-primary transition-colors text-[13px] tracking-[2px] uppercase">SPEAKERS</a>
          <a routerLink="/category/earphones" class="text-white hover:text-primary transition-colors text-[13px] tracking-[2px] uppercase">EARPHONES</a>
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

      <!-- Mobile Menu -->
      @if (isMobileMenuOpen) {
        <div class="lg:hidden fixed inset-0 bg-black/40 z-50" (click)="closeMobileMenu()">
          <div class="bg-white w-full min-h-screen pt-24 pb-8" (click)="$event.stopPropagation()">
            <!-- Close Button -->
            <button 
              (click)="closeMobileMenu()" 
              class="absolute top-8 right-6 text-black hover:text-primary transition-colors">
              <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.485 1.515L8 7l5.485 5.485-1.414 1.414L6.586 8.414 1.101 13.9l-1.414-1.414L5.172 7 .687 2.515 2.101 1.1 7.586 6.586 13.071 1.1l.414.415z" 
                      fill="currentColor"/>
              </svg>
            </button>

            <!-- Categories Grid -->
            <div class="container mx-auto px-6">
              <div class="grid grid-cols-1 gap-y-16">
                <a routerLink="/category/headphones" 
                   (click)="closeMobileMenu()"
                   class="bg-gray-light rounded-lg pt-[88px] pb-6 px-4 text-center relative group">
                  <img src="assets/shared/desktop/image-category-thumbnail-headphones.png" 
                       alt="Headphones"
                       class="w-32 absolute left-1/2 -translate-x-1/2 -top-12 transition-transform group-hover:scale-105">
                  <h6 class="text-[15px] font-bold tracking-[1.3px] uppercase mb-4">HEADPHONES</h6>
                  <span class="text-black/50 uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors inline-flex items-center">
                    SHOP <span class="ml-2 text-primary">›</span>
                  </span>
                </a>

                <a routerLink="/category/speakers" 
                   (click)="closeMobileMenu()"
                   class="bg-gray-light rounded-lg pt-[88px] pb-6 px-4 text-center relative group">
                  <img src="assets/shared/desktop/image-category-thumbnail-speakers.png" 
                       alt="Speakers"
                       class="w-32 absolute left-1/2 -translate-x-1/2 -top-12 transition-transform group-hover:scale-105">
                  <h6 class="text-[15px] font-bold tracking-[1.3px] uppercase mb-4">SPEAKERS</h6>
                  <span class="text-black/50 uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors inline-flex items-center">
                    SHOP <span class="ml-2 text-primary">›</span>
                  </span>
                </a>

                <a routerLink="/category/earphones" 
                   (click)="closeMobileMenu()"
                   class="bg-gray-light rounded-lg pt-[88px] pb-6 px-4 text-center relative group">
                  <img src="assets/shared/desktop/image-category-thumbnail-earphones.png" 
                       alt="Earphones"
                       class="w-32 absolute left-1/2 -translate-x-1/2 -top-12 transition-transform group-hover:scale-105">
                  <h6 class="text-[15px] font-bold tracking-[1.3px] uppercase mb-4">EARPHONES</h6>
                  <span class="text-black/50 uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors inline-flex items-center">
                    SHOP <span class="ml-2 text-primary">›</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    </header>
  `
})
export class HeaderComponent {
  isMobileMenuOpen = false;

  constructor(
    public cartService: CartService,
    private dialogService: CartDialogService
  ) {}

  openCart() {
    this.dialogService.open();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
} 