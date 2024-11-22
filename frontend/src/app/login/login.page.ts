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
  errorMessages: { [key: string]: string } = {};
  isAuthenticated: boolean = false;

  passwordVisible: boolean = false; // Variable para controlar la visibilidad de la contraseña

  constructor(private authService: AuthService, private router: Router) {}

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login exitoso', response);
          this.errorMessages = {};
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error en el login', error);
          if (typeof error === 'string') {
            this.errorMessage = error;
            this.errorMessages = {};
          } else {
            this.errorMessage = '';
            this.errorMessages = error;
          }
        }
      );
  }
}
