// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: any) {
    const currentCart = this.cart.value;
    currentCart.push(product);
    this.cart.next(currentCart);
    console.log('Producto agregado al carrito:', product);
  }

  getCartItemCount() {
    return this.cart.value.length;
  }
}
