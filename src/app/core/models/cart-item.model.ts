import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  get subtotal(): number; // compute in code
}
