import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductInfo } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  private subscriptions: Subscription[] = [];
  products: ProductInfo[] = [];

  categories: string[] = [];
  category: string = '';
  searchQuery: string = '';

  totalRecords: number = 0;
  limit: number = 12;
  skip: number = 0;

  loading: boolean = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.getAllCategories();
    this.getProductsWithLimitation();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getAllCategories() {
    this.loading = true;
    const req = this.productsService.getAllCategories().subscribe((data) => {
      this.loading = false;
      this.categories = data;
    });
    this.subscriptions.push(req);
  }

  getProductsWithLimitation() {
    const req = this.productsService
      .paginateProducts(this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalRecords = data.total;
        this.products = data.products;
      });
    this.subscriptions.push(req);
  }

  getProductsWithCategory(event: any) {
    this.searchQuery = '';
    this.category = event.value;
    const req = this.productsService
      .getProductsByCategory(event.value, this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalRecords = data.total;
        this.products = data.products;
      });
    this.subscriptions.push(req);
  }

  searchProductWIthQuery() {
    this.category = '';
    const req = this.productsService
      .filterProducts(this.searchQuery, this.limit, this.skip)
      .subscribe((data: any) => {
        this.totalRecords = data.total;
        this.products = data.products;
      });
    this.subscriptions.push(req);
  }

  onPageChange(event: any) {
    this.skip = event.first;
    if (this.searchQuery) {
      this.searchProductWIthQuery();
    } else if (this.category) {
      this.getProductsWithCategory(this.category);
    } else {
      this.getProductsWithLimitation();
    }
  }
}
