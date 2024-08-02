import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.mode';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3001/api/v1/users';

  constructor(private http: HttpClient) { }


  getUsers(limit?: number): Observable<User[]> {
    let params = new HttpParams();
    if (limit) {
      params = params.set('limit', limit.toString());
    }
    return this.http.get<User[]>(this.apiUrl, { params });
  }

  createUser(user: { email: string; name: string; password: string; role: string; avatar: string }): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: { email: string; name: string; password: string; role: string; avatar: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  checkUserAvailability(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/is-available`, { email });
  }
  

}
