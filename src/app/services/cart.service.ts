import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from './data.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'audiophile_cart';
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    const savedCart = localStorage.getItem(this.STORAGE_KEY);
    if (savedCart) {
      this.cartSubject.next(JSON.parse(savedCart));
    }
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: Product, quantity: number) {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = currentCart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      this.saveCart(updatedCart);
    } else {
      this.saveCart([...currentCart, { product, quantity }]);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    const currentCart = this.cartSubject.value;
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedCart = currentCart.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    this.saveCart(updatedCart);
  }

  removeFromCart(productId: number) {
    const filteredCart = this.cartSubject.value.filter(
      item => item.product.id !== productId
    );
    this.saveCart(filteredCart);
  }

  clearCart() {
    this.saveCart([]);
  }

  getTotal() {
    return this.cart$.pipe(
      map(items => items.reduce(
        (total, item) => total + (item.product.price * item.quantity), 
        0
      ))
    );
  }

  getItemCount() {
    return this.cart$.pipe(
      map(items => items.reduce(
        (count, item) => count + item.quantity, 
        0
      ))
    );
  }
}
