import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private apiUrl = 'http://project.test/backend/public/api'; // Cambia esto si es necesarios
  //private apiUrl = 'https://izzicode-production.up.railway.app/api';
  private apiUrl = 'http://127.0.0.1:8000/api'; 
  //[src]="'https://izzicode-production.up.railway.app/storage/'  + repuesto.imagen"
  //[src]="'http://project.test/backend/storage/app/public/'  + repuesto.imagen"
  //[src]="'http://project.test/backend/public/storage/'  + repuesto.imagen"

  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated()); // Estado inicial
  public authStatus$ = this.authStatusSubject.asObservable(); // Observable para suscripción

  constructor(private http: HttpClient, private router: Router) {}


  getEmpleadosByCargo(cargo: string): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    // Aquí hacemos la solicitud GET, pasando los headers y el endpoint correcto
    return this.http
      .get<any>(`${this.apiUrl}/empleados/filter/${cargo}`, { headers })
      .pipe(
        catchError(this.handleError) // Asegúrate de que `handleError` esté implementado
      );
  }
//private apiUrl = 'https://izzicode-production.up.railway.app/api'; // Cambia esto si es necesarios
  private handleError(error: any): Observable<never> {
    let errorMsgs: { [key: string]: string } = {};
    let errorMsg = '';

    if (error.error && error.error.validationError) {
      // Errores de validación específicos de cada campo
      for (let field in error.error.validationError) {
        errorMsgs[field] = error.error.validationError[field][0];
      }
      return throwError(() => errorMsgs);
    } else if (error.error && error.error.messageError) {
      // Error de base de datos
      errorMsg = error.error.messageError;
    } else if (error.error && error.error.detailsError) {
      // Otro error general
      errorMsg = error.error.messageError;
    } else {
      // Error inesperado
      errorMsg = 'Error inesperado. Intenta de nuevo.';
    }
    return throwError(() => errorMsg);
  }

  eliminarUsuario(idEmpleado: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/eliminar_usuario/${idEmpleado}`
    );
  }

  BuscarUsuario(idEmpleado: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/Buscar_usuario/${idEmpleado}`
    );
  }


  verificarUsuarioPorEmpleado(idEmpleado: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/verificar-usuario/${idEmpleado}`);
  }

  createUser(idEmpleado: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/generar-usuario/${idEmpleado}`);
  }

  login(credentials: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError),
      tap((response: any) => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('role_id', response.role_id);
        localStorage.setItem('empleado_id', response.empleado_id);
        localStorage.setItem('user',response.user);
        this.authStatusSubject.next(true); // Cambia el estado a autenticado
        this.router.navigate(['/home']);
      })
    );
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('empleado_id');
    this.authStatusSubject.next(false); // Cambia el estado a no autenticado
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
    console.log('La sesion se cerró');
  }


  //crud empleados
  AgregarEmpleado(nuevoEmpleado: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .post<any>(`${this.apiUrl}/empleados`, nuevoEmpleado, { headers }) // Asegúrate de pasar los headers aquí
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
      .delete(`${this.apiUrl}/empleados/${empleadoId}`, { headers })
      .pipe(catchError(this.handleError));
  }
  // Método para actualizar un repuesto
  ActualizarEmpleado(empleadoId: number, empleadoData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .put(`${this.apiUrl}/empleados/${empleadoId}`, empleadoData, { headers }) // Aquí usas PUT para actualizar
      .pipe(catchError(this.handleError)); // Manejo de errores
  }

  // CRUD Clientes
AgregarCliente(clienteData: any): Observable<any> {
  const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`, // Establecer el token en los headers
  });
  return this.http
    .post(`${this.apiUrl}/clientes`, clienteData, { headers }) // Pasar los headers aquí
    .pipe(catchError(this.handleError)); // Manejo de errores
}

ListarClientes(): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });
  return this.http
    .get<any[]>(`${this.apiUrl}/clientes`, { headers })
    .pipe(catchError(this.handleError));
}


EliminarCliente(clienteId: number): Observable<any> {
  const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`, // Establecer el token en los headers
  });
  return this.http
    .delete(`${this.apiUrl}/clientes/${clienteId}`, { headers }) // Pasar los headers aquí
    .pipe(catchError(this.handleError)); // Manejo de errores
}

ActualizarCliente(clienteId: number, clienteData: any): Observable<any> {
  const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`, // Establecer el token en los headers
  });
  return this.http
    .put(`${this.apiUrl}/clientes/${clienteId}`, clienteData, { headers }) // Pasar los headers aquí
    .pipe(catchError(this.handleError)); // Manejo de errores
}


  //crud repuestos
  AgregarRepuesto(repuestoData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });

    return this.http
      .post(`${this.apiUrl}/repuestos`, repuestoData, { headers }) // Pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

   // Método para actualizar un repuesto
  actualizarRepuesto(repuestoId: number, repuestoData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });

    return this.http
      .put(`${this.apiUrl}/repuestos/${repuestoId}`, repuestoData, { headers }) // Pasar los headers aquí
      .pipe(catchError(this.handleError)); // Manejo de errores
  }



  // Método para listar repuestos
  repuestosListar(): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });

    return this.http
      .get(`${this.apiUrl}/repuestos`, { headers }) // Pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  // Método para eliminar un repuesto
  eliminarRepuesto(repuestoId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });

    return this.http
      .delete(`${this.apiUrl}/repuestos/${repuestoId}`, { headers }) // Pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  // CRUD marcas
  AgregarMarca(credentials: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .post<any[]>(`${this.apiUrl}/marcas`, credentials, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  listarMarcas(): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .get<any[]>(`${this.apiUrl}/marcas`, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  eliminarMarca(marcaId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .delete(`${this.apiUrl}/marcas/${marcaId}`, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  actualizarMarca(marcaId: number, marcaData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .put(`${this.apiUrl}/marcas/${marcaId}`, marcaData, { headers }) // Aquí usas PUT para actualizar
      .pipe(catchError(this.handleError)); // Manejo de errores
  }
  // CRUD Categorías
  AgregarCategoria(credentials: any): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .post<any[]>(`${this.apiUrl}/categorias`, credentials, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  listarCategorias(): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .get<any[]>(`${this.apiUrl}/categorias`, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  eliminarCategoria(categoriaId: number): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .delete(`${this.apiUrl}/categorias/${categoriaId}`, { headers }) // Asegúrate de pasar los headers aquí
      .pipe(catchError(this.handleError));
  }

  actualizarCategoria(
    categoriaId: number,
    categoriaData: any
  ): Observable<any> {
    const token = localStorage.getItem('token'); // Recuperar el token del Local Storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Establecer el token en los headers
    });
    return this.http
      .put(`${this.apiUrl}/categorias/${categoriaId}`, categoriaData, {
        headers,
      }) // Aquí usas PUT para actualizar
      .pipe(catchError(this.handleError)); // Manejo de errores
  }

  //listar cargos
  listarCargos(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<any[]>(`${this.apiUrl}/cargos`, { headers })
      .pipe(catchError(this.handleError));
  }
}
