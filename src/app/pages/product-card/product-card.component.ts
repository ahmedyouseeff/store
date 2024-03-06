import { Component, Input } from '@angular/core';
import { ProductInfo } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: ProductInfo;
  count: number = 0;

  constructor(protected cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartProductsCount.subscribe(
      (count) => (this.count = count)
    );
  }

  getSeverity(stokeNumber: number) {
    switch (stokeNumber > 0) {
      case stokeNumber > 0:
        return {
          status: 'success',
          value: 'INSTOCK',
        };

      default:
        return {
          status: 'danger',
          value: 'OUT OF STOCK',
        };
    }
  }
}
