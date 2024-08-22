import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001/api/v1/auth/login';

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token'); // Recupera el token del almacenamiento local

    // Configura los encabezados de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Agrega el token JWT al encabezado
    });

    // Realiza la solicitud GET con los encabezados
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers });
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
