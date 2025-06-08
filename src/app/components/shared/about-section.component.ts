import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="container px-6 py-40">
      <div class="grid grid-cols-2 gap-16 items-center">
        <div>
          <h2 class="text-h2 uppercase mb-8">
            Bringing you the <span class="text-primary">best</span> audio gear
          </h2>
          <p class="text-body text-black/50">
            Located at the heart of New York City, Audiophile is the premier store for high end headphones, 
            earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration 
            rooms available for you to browse and experience a wide range of our products. Stop by our store 
            to meet some of the fantastic people who make Audiophile the best place to buy your portable 
            audio equipment.
          </p>
        </div>
        <div>
          <img src="assets/shared/desktop/image-best-gear.jpg" 
               alt="Best audio gear" 
               class="rounded-lg w-full">
        </div>
      </div>
    </section>
  `
})
export class AboutSectionComponent {} 