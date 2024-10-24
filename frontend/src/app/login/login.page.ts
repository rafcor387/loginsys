import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login exitoso', response);
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('role_id', response.role_id);
          //this.router.navigate(['/empleados']); // Cambia esto según tu estructura

          // Redirige primero a la página de empleados
          this.router.navigate(['/home']).then(() => {
            // Luego recarga la página después de que la navegación se complete
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error en el login', error);
          this.errorMessage = error; // Almacenar el mensaje de error
        }
      );
  }
}
