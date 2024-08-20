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
    const existingProductIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      // Product already in cart, update quantity
      currentCart[existingProductIndex].quantity += product.quantity;
    } else {
      // New product, add to cart
      product.quantity = product.quantity || 1; // Default quantity to 1
      currentCart.push(product);
    }

    this.cart.next(currentCart);
    console.log('Producto agregado al carrito:', product);
  }

  updateCart(updatedCart: any[]) {
    this.cart.next(updatedCart);
    console.log('Carrito actualizado:', updatedCart);
  }

  getCartItemCount() {
    return this.cart.value.length;
  }

  removeFromCart(productId: number) {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(item => item.id !== productId);
    this.cart.next(updatedCart);
    console.log('Producto eliminado del carrito:', productId);
  }

  updateProductQuantity(productId: number, quantity: number) {
    const currentCart = this.cart.value;
    const productIndex = currentCart.findIndex(item => item.id === productId);

    if (productIndex > -1) {
      currentCart[productIndex].quantity = quantity;
      this.cart.next(currentCart);
      console.log('Cantidad de producto actualizada:', currentCart[productIndex]);
    }
  }
}
