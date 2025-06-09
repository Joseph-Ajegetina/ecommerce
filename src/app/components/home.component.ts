import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CategoryGridComponent } from './shared/category-grid.component';
import { AboutSectionComponent } from './shared/about-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryGridComponent, AboutSectionComponent],
  template: `
    <!-- Hero Section -->
    <section class="bg-black">
      <div class="container mx-auto px-6 relative">
        <picture class="absolute inset-0">
          <source media="(min-width: 1024px)" srcset="assets/home/desktop/image-hero.jpg">
          <source media="(min-width: 768px)" srcset="assets/home/tablet/image-header.jpg">
          <img src="assets/home/mobile/image-header.jpg" 
               alt="XX99 Mark II Headphones"
               class="w-full h-full object-cover md:object-center lg:object-left">
        </picture>
        <div class="flex flex-col items-center text-center lg:items-start lg:text-left pt-[120px] pb-[120px] lg:pt-[128px] lg:pb-[158px] relative z-10">
          <div class="max-w-[380px]">
            <p class="text-white/50 tracking-[10px] uppercase mb-6 text-[14px]">New Product</p>
            <h1 class="text-white text-[36px] md:text-[56px] font-bold tracking-[2px] uppercase mb-6 leading-[1.1]">
              XX99 Mark II<br>Headphones
            </h1>
            <p class="text-white/75 text-[15px] leading-[25px] mb-10">
              Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
            </p>
            <a routerLink="/product/xx99-mark-two-headphones" 
               class="bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors inline-block text-[13px] font-bold">
              See Product
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <app-category-grid />

    <!-- Featured Products -->
    <section class="container mx-auto px-6 py-24">
      <div class="space-y-8">
        <!-- ZX9 Speaker -->
        <div class="bg-primary rounded-lg overflow-hidden relative">
          <div class="flex flex-col md:flex-row items-center text-center md:text-left px-6 md:px-12 lg:px-24 pt-[55px] pb-[55px] md:py-16">
            <div class="w-[172px] md:w-[197px] lg:w-[410px] mb-8 md:mb-0 md:mr-12 lg:mr-24 relative">
              <img src="assets/home/desktop/image-speaker-zx9.png" 
                   alt="ZX9 Speaker"
                   class="w-full">
            </div>
            <div class="max-w-[350px]">
              <h2 class="text-white text-[36px] md:text-[56px] font-bold tracking-[1.3px] md:tracking-[2px] uppercase mb-6 leading-[1.1]">
                ZX9<br>Speaker
              </h2>
              <p class="text-white/75 text-[15px] leading-[25px] mb-8">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <a routerLink="/product/zx9-speaker" 
                 class="bg-black text-white px-8 py-4 uppercase tracking-[1px] hover:bg-gray-900 transition-colors inline-block text-[13px] font-bold">
                See Product
              </a>
            </div>
          </div>
        </div>

        <!-- ZX7 Speaker -->
        <div class="relative rounded-lg overflow-hidden h-[320px]">
          <picture>
            <source media="(min-width: 1024px)" srcset="assets/home/desktop/image-speaker-zx7.jpg">
            <source media="(min-width: 768px)" srcset="assets/home/tablet/image-speaker-zx7.jpg">
            <img src="assets/home/mobile/image-speaker-zx7.jpg" 
                 alt="ZX7 Speaker"
                 class="w-full h-full object-cover">
          </picture>
          <div class="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
            <div>
              <h2 class="text-black text-[28px] font-bold tracking-[2px] uppercase mb-8">ZX7 Speaker</h2>
              <a routerLink="/product/zx7-speaker" 
                 class="border-2 border-black text-black px-8 py-4 uppercase tracking-[1px] hover:bg-black hover:text-white transition-colors inline-block text-[13px] font-bold">
                See Product
              </a>
            </div>
          </div>
        </div>

        <!-- YX1 Earphones -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div class="rounded-lg overflow-hidden h-[200px] md:h-[320px]">
            <picture>
              <source media="(min-width: 1024px)" srcset="assets/home/desktop/image-earphones-yx1.jpg">
              <source media="(min-width: 768px)" srcset="assets/home/tablet/image-earphones-yx1.jpg">
              <img src="assets/home/mobile/image-earphones-yx1.jpg" 
                   alt="YX1 Earphones"
                   class="w-full h-full object-cover">
            </picture>
          </div>
          <div class="bg-gray-light rounded-lg h-[200px] md:h-[320px] flex items-center px-6 md:px-12">
            <div>
              <h2 class="text-black text-[28px] font-bold tracking-[2px] uppercase mb-8">YX1 Earphones</h2>
              <a routerLink="/product/yx1-earphones" 
                 class="border-2 border-black text-black px-8 py-4 uppercase tracking-[1px] hover:bg-black hover:text-white transition-colors inline-block text-[13px] font-bold">
                See Product
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <app-about-section />
  `
})
export class HomeComponent {} 