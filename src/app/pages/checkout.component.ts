import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { CartItem } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="bg-gray-light min-h-screen py-16">
      <div class="container mx-auto px-6">
        <button routerLink=".." class="text-black/50 mb-8 hover:text-primary transition-colors">
          Go Back
        </button>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Checkout Form -->
          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()" class="lg:col-span-2 bg-white rounded-lg p-8">
            <h1 class="text-h3 mb-8">CHECKOUT</h1>

            <!-- Billing Details -->
            <h2 class="text-primary text-[13px] font-bold tracking-[1px] mb-4">BILLING DETAILS</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label class="block text-[12px] font-bold mb-2">Name</label>
                <input type="text" 
                       formControlName="name"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('name')"
                       placeholder="Alexei Ward">
                @if (isFieldInvalid('name')) {
                  <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                }
              </div>
              <div>
                <label class="block text-[12px] font-bold mb-2">Email Address</label>
                <input type="email" 
                       formControlName="email"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('email')"
                       placeholder="alexei@mail.com">
                @if (isFieldInvalid('email')) {
                  <span class="text-red-500 text-[12px] mt-1">Please enter a valid email</span>
                }
              </div>
              <div>
                <label class="block text-[12px] font-bold mb-2">Phone Number</label>
                <input type="tel" 
                       formControlName="phone"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('phone')"
                       placeholder="+1 202-555-0136">
                @if (isFieldInvalid('phone')) {
                  <span class="text-red-500 text-[12px] mt-1">Please enter a valid phone number</span>
                }
              </div>
            </div>

            <!-- Shipping Info -->
            <h2 class="text-primary text-[13px] font-bold tracking-[1px] mb-4">SHIPPING INFO</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div class="md:col-span-2">
                <label class="block text-[12px] font-bold mb-2">Address</label>
                <input type="text" 
                       formControlName="address"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('address')"
                       placeholder="1137 Williams Avenue">
                @if (isFieldInvalid('address')) {
                  <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                }
              </div>
              <div>
                <label class="block text-[12px] font-bold mb-2">ZIP Code</label>
                <input type="text" 
                       formControlName="zipCode"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('zipCode')"
                       placeholder="10001">
                @if (isFieldInvalid('zipCode')) {
                  <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                }
              </div>
              <div>
                <label class="block text-[12px] font-bold mb-2">City</label>
                <input type="text" 
                       formControlName="city"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('city')"
                       placeholder="New York">
                @if (isFieldInvalid('city')) {
                  <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                }
              </div>
              <div>
                <label class="block text-[12px] font-bold mb-2">Country</label>
                <input type="text" 
                       formControlName="country"
                       class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                       [class.border-red-500]="isFieldInvalid('country')"
                       placeholder="United States">
                @if (isFieldInvalid('country')) {
                  <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                }
              </div>
            </div>

            <!-- Payment Details -->
            <h2 class="text-primary text-[13px] font-bold tracking-[1px] mb-4">PAYMENT DETAILS</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-[12px] font-bold mb-2">Payment Method</label>
                <div class="space-y-4">
                  <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer">
                    <input type="radio" 
                           formControlName="paymentMethod" 
                           value="e-money"
                           class="mr-4">
                    e-Money
                  </label>
                  <label class="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer">
                    <input type="radio" 
                           formControlName="paymentMethod" 
                           value="cash"
                           class="mr-4">
                    Cash on Delivery
                  </label>
                </div>
              </div>
              @if (checkoutForm.get('paymentMethod')?.value === 'e-money') {
                <div>
                  <label class="block text-[12px] font-bold mb-2">e-Money Number</label>
                  <input type="text" 
                         formControlName="eMoneyNumber"
                         class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                         [class.border-red-500]="isFieldInvalid('eMoneyNumber')"
                         placeholder="238521993">
                  @if (isFieldInvalid('eMoneyNumber')) {
                    <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                  }
                </div>
                <div>
                  <label class="block text-[12px] font-bold mb-2">e-Money PIN</label>
                  <input type="text" 
                         formControlName="eMoneyPin"
                         class="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                         [class.border-red-500]="isFieldInvalid('eMoneyPin')"
                         placeholder="6891">
                  @if (isFieldInvalid('eMoneyPin')) {
                    <span class="text-red-500 text-[12px] mt-1">This field is required</span>
                  }
                </div>
              }
            </div>
          </form>

          <!-- Summary -->
          <div class="bg-white rounded-lg p-8">
            <h2 class="text-h6 mb-8">SUMMARY</h2>

            @if (cart$ | async; as cartItems) {
              <div class="space-y-6 mb-8">
                @for (item of cartItems; track item.product.id) {
                  <div class="flex items-center gap-4">
                    <img [src]="item.product.image.desktop" 
                         [alt]="item.product.name"
                         class="w-16 h-16 rounded-lg bg-gray-light">
                    <div class="flex-1">
                      <h6 class="text-[15px] font-bold">{{ item.product.name }}</h6>
                      <p class="text-[14px] font-bold text-black/50">
                        $ {{ item.product.price.toLocaleString() }}
                      </p>
                    </div>
                    <span class="text-black/50">x{{ item.quantity }}</span>
                  </div>
                }
              </div>

              <div class="space-y-2 mb-6">
                <div class="flex justify-between">
                  <span class="text-black/50 uppercase">Total</span>
                  <span class="text-h6">$ {{ (total$ | async)?.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-black/50 uppercase">Shipping</span>
                  <span class="text-h6">$ 50</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-black/50 uppercase">VAT (Included)</span>
                  <span class="text-h6">$ {{ ((total$ | async) || 0 * 0.2)?.toLocaleString() }}</span>
                </div>
                <div class="flex justify-between mt-6 pt-6 border-t">
                  <span class="text-black/50 uppercase">Grand Total</span>
                  <span class="text-h6 text-primary">
                    $ {{ ((total$ | async) || 0 + 50)?.toLocaleString() }}
                  </span>
                </div>
              </div>

              <button type="submit"
                      (click)="onSubmit()"
                      [disabled]="checkoutForm.invalid"
                      class="w-full bg-primary text-white px-8 py-4 uppercase tracking-[1px] hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Continue & Pay
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  total$!: Observable<number>;
  checkoutForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart$ = this.cartService.cart$;
    this.total$ = this.cartService.getTotal();

    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]+$/)]],
      address: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      paymentMethod: ['e-money', Validators.required],
      eMoneyNumber: [''],
      eMoneyPin: ['']
    });

    // Add conditional validation for e-money fields
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      const eMoneyNumber = this.checkoutForm.get('eMoneyNumber');
      const eMoneyPin = this.checkoutForm.get('eMoneyPin');

      if (method === 'e-money') {
        eMoneyNumber?.setValidators([Validators.required]);
        eMoneyPin?.setValidators([Validators.required]);
      } else {
        eMoneyNumber?.clearValidators();
        eMoneyPin?.clearValidators();
      }

      eMoneyNumber?.updateValueAndValidity();
      eMoneyPin?.updateValueAndValidity();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      console.log('Form submitted:', this.checkoutForm.value);
      this.router.navigate(['/order-confirmation']);
    } else {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const control = this.checkoutForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
} 