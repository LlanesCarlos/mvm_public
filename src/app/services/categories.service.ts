import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'http://localhost:3001/api/v1/categories';

  constructor(private http: HttpClient) { }


  getCategories(limit?: number): Observable<Category[]> {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<Category[]>(this.apiUrl, { params });
  }

  createCategory(category: { name: string; image: string }): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  updateCategory(id: number, category: { name: string; image: string }): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getCategoryProducts(id: number, limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit.toString());
    }
    if (offset) {
      params = params.set('offset', offset.toString());
    }
    return this.http.get<Product[]>(`${this.apiUrl}/${id}/products`, { params });
  }
}
