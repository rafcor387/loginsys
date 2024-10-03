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

  login(credentials: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMsg = '';
    let stg_error = true;

    
    if (error.error && error.error.message) {
      // Capturar el mensaje que envía Laravel en el campo 'message'
      errorMsg = error.error.message;
      stg_error = false;
    } 
    if (error.error && error.error.errors) {
      // Laravel envía los errores en un campo 'errors'
      errorMsg = Object.values(error.error.errors).join(' ');
      stg_error = false;
    }
    if(stg_error){
      errorMsg = 'Error inesperado. Intenta de nuevo.';
    }
    return throwError(() => (errorMsg));
    //return throwError(errorMsg);
  }

  //agregar, mostrar, eliminar repuestos
  repuestos(credentials: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/repuestos`, credentials)
      .pipe(catchError(this.handleError));
  }
  repuestosListar(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/repuestos`)
      .pipe(catchError(this.handleError));
  }
  eliminarRepuesto(repuestoId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/repuestos/${repuestoId}`)
      .pipe(catchError(this.handleError));
  }

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
