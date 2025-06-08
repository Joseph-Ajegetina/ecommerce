import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header.component';
import { CartComponent } from './components/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HttpClientModule, HeaderComponent, CartComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-white">
      <app-header />
      <app-cart />
      <main class="flex-grow">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `
})
export class AppComponent {}
