import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartEntry } from '../../../core/services/cart.service';
@Component({
  selector: 'app-checkout-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css'
})
export class CheckoutPage {
 @Input() visible = false;
  @Input() items: CartEntry[] = [];
  @Input() total = 0;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  state = '';
  zip = '';

  onConfirm() {
    this.confirm.emit();
  }
}
