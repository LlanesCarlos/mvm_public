import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'http://localhost:3001/api/v1/products';

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFilteredProducts(categoryIds: number[], priceMin: number, priceMax: number): Observable<Product[]> {
    let params = new HttpParams();

    if (categoryIds.length > 0) {
      params = params.set('categoryId', categoryIds.join(','));
    }
    if (priceMin != null) {
      params = params.set('price_min', priceMin.toString());
    }
    if (priceMax != null) {
      params = params.set('price_max', priceMax.toString());
    }

    return this.http.get<Product[]>(this.apiUrl, { params });
  }
}
