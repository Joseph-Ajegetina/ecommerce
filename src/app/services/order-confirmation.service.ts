import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderConfirmationService {
  private orderItemsSubject = new BehaviorSubject<CartItem[]>([]);
  orderItems$ = this.orderItemsSubject.asObservable();
  
  private orderTotalSubject = new BehaviorSubject<number>(0);
  orderTotal$ = this.orderTotalSubject.asObservable();

  setOrderDetails(items: CartItem[], total: number) {
    this.orderItemsSubject.next(items);
    this.orderTotalSubject.next(total);
  }

  clearOrderDetails() {
    this.orderItemsSubject.next([]);
    this.orderTotalSubject.next(0);
  }
} 