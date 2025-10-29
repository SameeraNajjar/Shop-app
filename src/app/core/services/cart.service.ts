import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartEntry { product: Product; quantity: number; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private storageKey = 'shop_cart_v1';
  private _items$ = new BehaviorSubject<CartEntry[]>(this.readFromStorage());

  items$ = this._items$.asObservable();

  private readFromStorage(): CartEntry[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartEntry[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  get items(): CartEntry[] {
    return this._items$.value;
  }

  add(product: Product, qty = 1) {
    const items = [...this.items];
    const idx = items.findIndex(i => i.product.id === product.id);
    if (idx > -1) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
    } else {
      items.push({ product, quantity: qty });
    }
    this._items$.next(items);
    this.saveToStorage(items);
  }

  remove(productId: string) {
    const items = this.items.filter(i => i.product.id !== productId);
    this._items$.next(items);
    this.saveToStorage(items);
  }

  updateQuantity(productId: string, quantity: number) {
    const items = this.items.map(i => i.product.id === productId ? { ...i, quantity } : i).filter(i => i.quantity > 0);
    this._items$.next(items);
    this.saveToStorage(items);
  }

  clear() {
    this._items$.next([]);
    localStorage.removeItem(this.storageKey);
  }

  getSubtotal(): number {
    return this.items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  }
}
