import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { ProductCard } from '../product-card/product-card';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../../../core/services/search.service';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard, HttpClientModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductList implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    // Fetch all products
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.filteredProducts = data;
    });

    // Subscribe to search term from navbar
    this.searchService.currentSearch$
      .pipe(debounceTime(300)) // optional smoothing
      .subscribe(term => {
        const searchTerm = (term || '').toLowerCase();
        if (searchTerm) {
          this.filteredProducts = this.products.filter(p =>
            p.title?.toLowerCase().includes(searchTerm) ||
            p.category?.toLowerCase().includes(searchTerm)
          );
        } else {
          this.filteredProducts = this.products;
        }
      });
  }

  onProductClick(product: Product) {
    this.router.navigate(['/products', product.id]);
  }
}