import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://project.test/backend/public/api'; // Cambia esto si es necesario

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http
    .post(`${this.apiUrl}/register`, user)
    .pipe(catchError(this.handleError));
    
  }
  /*
  login(credentials: any): Observable<any> {
    return this.http.
    post(`${this.apiUrl}/login`, credentials);
  }
    */
  login(credentials: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMsg = '';

    if (error.error && error.error.message) {
      // Capturar el mensaje que envía Laravel en el campo 'message'
      errorMsg = error.error.message;
    } if (error.error && error.error.errors) {
      // Laravel envía los errores en un campo 'errors'
      errorMsg = Object.values(error.error.errors).join(' ');
    } else {
      errorMsg = 'Error inesperado. Intenta de nuevo.';
    }
    return throwError(errorMsg);
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
