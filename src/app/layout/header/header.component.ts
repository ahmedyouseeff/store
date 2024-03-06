import { Component } from '@angular/core';
import { UserInfo } from 'src/app/models/userInfo';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  cartProductsCount: number = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  userInfo: UserInfo = this.authService.getUserInfo();

  ngOnInit(): void {
    this.cartService.cartProductsCount.subscribe(
      (count) => (this.cartProductsCount = count)
    );
  }

  logout() {
    this.authService.logOut();
  }
}
