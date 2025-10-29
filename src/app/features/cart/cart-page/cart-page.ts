import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CartEntry } from '../../../core/services/cart.service';
import { CartItem } from "../cart-item/cart-item";
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CheckoutPage } from '../../checkout/checkout-page/checkout-page';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, CartItem, CheckoutPage],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css'
})
export class CartPage implements OnInit {
  items: CartEntry[] = [];
  shipping = 0;
  taxRate = 0.1; // 10% tax 
  showCheckout = false;
  constructor(private cartService: CartService,
    private router: Router

  ) {

  }

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.items = items;
    });
  }

  get subtotal(): number {
    return this.cartService.getSubtotal();
  }

  get tax(): number {
    return this.subtotal * this.taxRate;
  }

  get total(): number {
    return this.subtotal + this.shipping + this.tax;
  }
  goBackToProducts() {
    this.router.navigate(['/products']);
  }
  clearCart() {
    this.cartService.clear();
  }
  proceedToCheckout() {
    this.showCheckout = true;
  }
  closeCheckout() {
    this.showCheckout = false;
  }
  confirmOrder() {
    alert('✅ Order confirmed successfully!');
    this.cartService.clear();
    this.closeCheckout();
    this.router.navigate(['/']);
  }
}
