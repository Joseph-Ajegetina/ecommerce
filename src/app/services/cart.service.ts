import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart-item.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shopping_cart';
  private readonly SHIPPING_COST = 50;
  private readonly VAT_RATE = 0.20;

  private cartSubject = new BehaviorSubject<Cart>({
    items: [],
    subtotal: 0,
    shipping: this.SHIPPING_COST,
    vat: 0,
    total: 0
  });

  constructor() {
    this.loadCart();
  }

  getCart(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.items.push({ product, quantity });
    }

    this.updateCartTotals(currentCart);
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    currentCart.items = currentCart.items.filter(item => item.product.id !== productId);
    
    this.updateCartTotals(currentCart);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.items.find(item => item.product.id === productId);
    
    if (item) {
      item.quantity = quantity;
      this.updateCartTotals(currentCart);
      this.saveCart();
    }
  }

  clearCart(): void {
    const emptyCart: Cart = {
      items: [],
      subtotal: 0,
      shipping: this.SHIPPING_COST,
      vat: 0,
      total: 0
    };
    
    this.cartSubject.next(emptyCart);
    localStorage.removeItem(this.CART_STORAGE_KEY);
  }

  private updateCartTotals(cart: Cart): void {
    cart.subtotal = cart.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
    cart.vat = cart.subtotal * this.VAT_RATE;
    cart.total = cart.subtotal + cart.shipping + cart.vat;
    
    this.cartSubject.next(cart);
  }

  private saveCart(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartSubject.value));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      const cart: Cart = JSON.parse(savedCart);
      this.cartSubject.next(cart);
    }
  }
}
