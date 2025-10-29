import { Product } from '../../../core/models/product.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  standalone: true,
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']

})
export class ProductCard {
  @Input() product!: Product;
  @Output() productClick = new EventEmitter<Product>();

  constructor(private cart: CartService) { }

  addToCart(event: Event) {
    event.stopPropagation(); // <-- Prevent triggering productClick
    this.cart.add(this.product);
  }

  onCardClick() {
    this.productClick.emit(this.product);
  }
}
