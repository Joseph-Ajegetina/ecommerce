import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="bg-dark-light">
      <div class="container border-b border-white/10">
        <nav class="flex items-center justify-between h-24">
          <!-- Logo -->
          <a routerLink="/" class="shrink-0">
            <img src="assets/shared/desktop/logo.svg" alt="Audiophile logo" class="h-6">
          </a>

          <!-- Navigation Links -->
          <ul class="flex gap-8">
            <li>
              <a routerLink="/"
                 routerLinkActive="text-primary"
                 [routerLinkActiveOptions]="{exact: true}"
                 class="text-white uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a routerLink="/category/headphones"
                 routerLinkActive="text-primary"
                 class="text-white uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors">
                Headphones
              </a>
            </li>
            <li>
              <a routerLink="/category/speakers"
                 routerLinkActive="text-primary"
                 class="text-white uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors">
                Speakers
              </a>
            </li>
            <li>
              <a routerLink="/category/earphones"
                 routerLinkActive="text-primary"
                 class="text-white uppercase text-[13px] tracking-[2px] font-bold hover:text-primary transition-colors">
                Earphones
              </a>
            </li>
          </ul>

          <!-- Cart Icon -->
          <a routerLink="/cart" class="shrink-0">
            <img src="assets/shared/desktop/icon-cart.svg" alt="Shopping cart" class="h-6 w-6">
          </a>
        </nav>
      </div>
    </header>
  `,
  styles: []
})
export class NavbarComponent {}
