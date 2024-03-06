import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(private cartService: CartService) {}

  ngOnInit() {
    //Get the count of items in the cart from LocalStorage and assign it to the BehaviorSubject
    this.cartService.setCartCountFromLocalStorage();
  }
}
