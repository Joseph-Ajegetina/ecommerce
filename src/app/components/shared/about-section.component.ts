import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container px-6 py-24 md:py-32 lg:py-40">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div class="text-center lg:text-left">
          <h2 class="text-[28px] md:text-h2 uppercase mb-6 md:mb-8">
            Bringing you the <span class="text-primary">best</span> audio gear
          </h2>
          <p class="text-[15px] text-black/50">
            Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
            earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
            rooms available for you to browse and experience a wide range of our products. Stop by our store 
            to meet some of the fantastic people who make Audiophile the best place to buy your portable 
            audio equipment.
          </p>
        </div>
        <div>
          <picture>
            <source srcset="assets/shared/desktop/image-best-gear.jpg" media="(min-width: 1024px)">
            <source srcset="assets/shared/tablet/image-best-gear.jpg" media="(min-width: 768px)">
            <img src="assets/shared/mobile/image-best-gear.jpg" 
                 alt="Best audio gear" 
                 class="rounded-lg w-full">
          </picture>
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {} 