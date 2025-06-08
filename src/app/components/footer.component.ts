import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-[#101010] text-white">
      <div class="container mx-auto px-6 py-12">
        <!-- Orange line and navigation -->
        <div class="border-t-4 border-[#D87D4A] w-24 mb-12"></div>
        <div class="flex justify-between items-start mb-9">
          <img src="assets/shared/desktop/logo.svg" alt="Audiophile logo" class="h-6">
          <nav>
            <ul class="flex gap-8">
              <li>
                <a routerLink="/" class="uppercase text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors">Home</a>
              </li>
              <li>
                <a routerLink="/category/headphones" class="uppercase text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors">Headphones</a>
              </li>
              <li>
                <a routerLink="/category/speakers" class="uppercase text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors">Speakers</a>
              </li>
              <li>
                <a routerLink="/category/earphones" class="uppercase text-[13px] tracking-[2px] hover:text-[#D87D4A] transition-colors">Earphones</a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Description and social links -->
        <div class="flex justify-between items-end">
          <div class="max-w-lg">
            <p class="text-white/50 mb-12">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team 
              of music lovers and sound specialists who are devoted to helping you get the 
              most out of personal audio. Come and visit our demo facility - we're open 7 
              days a week.
            </p>
            <p class="text-white/50">Copyright 2021. All Rights Reserved</p>
          </div>
          <div class="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#D87D4A] transition-colors">
              <img src="assets/shared/desktop/icon-facebook.svg" alt="Facebook" class="h-6 w-6">
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#D87D4A] transition-colors">
              <img src="assets/shared/desktop/icon-twitter.svg" alt="Twitter" class="h-6 w-6">
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#D87D4A] transition-colors">
              <img src="assets/shared/desktop/icon-instagram.svg" alt="Instagram" class="h-6 w-6">
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {}
