import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { ProductListComponent } from './components/product-list.component';
import { ProductDetailComponent } from './components/product-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout.component';
import { CategoryComponent } from './components/category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'product/:slug', component: ProductDetailComponent },
  { path: '**', redirectTo: '' }
];
