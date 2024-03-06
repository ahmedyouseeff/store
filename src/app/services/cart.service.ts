import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProductsCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  cartCount() {
    localStorage.setItem(
      'cartCount',
      JSON.stringify(this.cartProductsCount.getValue())
    );
  }

  setCartCountFromLocalStorage() {
    //Get the count of items in the cart from LocalStorage and assign it to the BehaviorSubject
    this.cartProductsCount.next(
      JSON.parse(localStorage.getItem('cartCount') || '0')
    );
  }
}
