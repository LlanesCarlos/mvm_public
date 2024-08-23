import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:3001/api/v1/addresses';

  constructor(private http: HttpClient) { }

  getUserAddresses(userId: number): Observable<any> {
    console.log('id',userId);
    return this.http.get(`${this.apiUrl}?userId=${userId}`);
  }
}
