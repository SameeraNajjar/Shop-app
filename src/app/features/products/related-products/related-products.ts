import { Component,Input, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { ProductCard } from '../product-card/product-card';
@Component({
  selector: 'app-related-products',
  imports:  [CommonModule, ProductCard],
  standalone: true,
  templateUrl: './related-products.html',
  styleUrl: './related-products.css'
})
export class RelatedProducts implements OnInit {
   @Input() category: string | undefined;
  relatedProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (this.category) {
      this.productService.getAll().subscribe((products) => {
        this.relatedProducts = products.filter(
          (p) => p.category === this.category
        );
      });
    }
  }
}