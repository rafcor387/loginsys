import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://project.test/backend/public/api'; // Cambia esto si es necesario

  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; // Retorna true si existe el token, false si no
  }
  

  //registrar usuario
  register(user: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, user)
      .pipe(catchError(this.handleError));
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/email`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Agregar el token en el encabezado
      },
    });
  }

  getCurrentUser() {
    return this.http.get(`${this.apiUrl}/user`); // Asegúrate de que esta ruta existe en tu API
  }

  

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
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
    if (stg_error) {
      errorMsg = 'Error inesperado. Intenta de nuevo.';
    }
    return throwError(() => errorMsg);
    //return throwError(errorMsg);
  }

  //crud empleados
  AgregarEmpleado(credentials: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .post<any[]>(`${this.apiUrl}/empleados`, credentials, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }
  ListarEmpleados(): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .get<any[]>(`${this.apiUrl}/empleados`, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }
  EliminarEmpleado(empleadoId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .delete(`${this.apiUrl}/empleados/${empleadoId}`,{headers})
      .pipe(catchError(this.handleError));
  }
  // Método para actualizar un repuesto
  ActualizarEmpleado(empleadoId: number, empleadoData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .put(`${this.apiUrl}/empleados/${empleadoId}`, empleadoData,{headers}) // Aquí usas PUT para actualizar
      .pipe(catchError(this.handleError)); // Manejo de errores
  }


  //crud repuestos
  Agregarepuestos(credentials: any): Observable<any> {
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
  // Método para actualizar un repuesto
  updateRepuesto(repuestoId: number, repuestoData: any): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/repuestos/${repuestoId}`, repuestoData) // Aquí usas PUT para actualizar
      .pipe(catchError(this.handleError)); // Manejo de errores
  }
}
