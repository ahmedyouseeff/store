import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductInfo } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  URL: string = 'products/';

  constructor(private http: HttpClient) {}
  //Requesting API to get all categories
  getAllCategories(): Observable<string[]> {
    return this.http
      .get(environment.BASE_URL + this.URL + 'categories')
      .pipe(map((category) => category as string[]));
  }

  //Due to all endpoints sharing the same return info and all of them need params
  //I makde a reusable function that takes the endpoint and the params then returns the product info
  private makeHttpRequest(
    endpoint: string,
    params: HttpParams
  ): Observable<ProductInfo> {
    return this.http
      .get(`${environment.BASE_URL}${this.URL}${endpoint}`, { params })
      .pipe(map((product) => product as ProductInfo));
  }

  getProductsByCategory(
    category: string,
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductInfo> {
    const params = new HttpParams().set('limit', limit).set('skip', skip);
    return this.makeHttpRequest(`category/${category}`, params);
  }

  filterProducts(
    query: string,
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductInfo> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit)
      .set('skip', skip);
    return this.makeHttpRequest('search/', params);
  }

  paginateProducts(
    limit: number = 12,
    skip: number = 0
  ): Observable<ProductInfo> {
    const params = new HttpParams().set('limit', limit).set('skip', skip);
    return this.makeHttpRequest('', params);
  }
}
