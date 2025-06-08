import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, HttpClientModule],
  template: `
    <div class="min-h-screen flex flex-col bg-white">
      <app-navbar />
      <main class="flex-grow">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,  
  styles: []
})
export class AppComponent {
  title = 'Audiophile';
}
