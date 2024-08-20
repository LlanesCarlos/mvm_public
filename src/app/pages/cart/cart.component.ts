import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  couponCode: string = '';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
    this.cartService.updateCart(this.cartItems);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.updateCart(this.cartItems);
    }
  }

  removeItem(item: any): void {
    this.cartItems = this.cartItems.filter(i => i !== item);
    this.cartService.updateCart(this.cartItems);
  }

  applyCoupon(): void {
    // Implement coupon logic here
  }

  proceedToCheckout(): void {
    // Implement checkout logic here
  }
}
