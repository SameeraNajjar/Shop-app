
import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService, CartEntry } from '../../../core/services/cart.service';
@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css'
})
export class CartItem {
  @Input() item!: CartEntry;

  constructor(private cartService: CartService) { }

  increment() {
    this.cartService.updateQuantity(this.item.product.id, this.item.quantity + 1);
  }

  decrement() {
    if (this.item.quantity > 1) {
      this.cartService.updateQuantity(this.item.product.id, this.item.quantity - 1);
    } else {
      this.cartService.remove(this.item.product.id);
    }
  }

  remove() {
    this.cartService.remove(this.item.product.id);
  }

  get subtotal(): number {
    return this.item.product.price * this.item.quantity;
  }
}
