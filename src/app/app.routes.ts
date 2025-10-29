import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductList} from './features/products/product-list/product-list';
import {ProductDetail} from './features/products/product-detail/product-detail';
import {CartPage} from './features/cart/cart-page/cart-page';
import {CheckoutPage} from './features/checkout/checkout-page/checkout-page';
import { HttpClientModule } from '@angular/common/http';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductList },
  { path: 'products/:id', component: ProductDetail },
  { path: 'cart', component: CartPage },
  { path: 'checkout', component: CheckoutPage },
  { path: '**', redirectTo: 'products' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
