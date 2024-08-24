import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://localhost:3001/api/v1/addresses';

  constructor(private http: HttpClient) { }

  getUserAddresses(userId: number): Observable<Address[]> {
    console.log('id',userId);
    return this.http.get<Address[]>(`${this.apiUrl}?userId=${userId}`);
  }

  createAddress(addressData: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, addressData);
  }

  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`);
  }

  updateAddress(id: number, addressData: Address): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, addressData);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
