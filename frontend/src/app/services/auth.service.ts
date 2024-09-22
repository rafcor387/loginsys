import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://project.test/backend/public/api'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  /*
  logout(token: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        //headers: { Authorization: `Bearer ${token}` }
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token en el encabezado
        },
      }
    );
  }*/
  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token en el encabezado
        },
      }
    );
  }

  getUserEmail(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/email`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token en el encabezado
      },
    });
  }
  
}
