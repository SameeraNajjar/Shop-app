import { Component ,OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  cartCount = 0;
  searchTerm = '';

  constructor(private cart: CartService, private searchService: SearchService) {}

  ngOnInit() {
    this.cart.items$.subscribe(items => {
      this.cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
    });
  }

  onSearchChange() {
    // Push the search term to the service as the user types
    this.searchService.setSearchTerm(this.searchTerm);
  }
}