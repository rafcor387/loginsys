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

  async login() {
  try {
    // Llamar al servicio de login y esperar la respuesta
    await this.authService.login({ email: this.email, password: this.password });
    console.log('Login exitoso');
  } catch (error: unknown) {
    // Verificar si el error es un objeto que tiene una propiedad "message"
    if (error instanceof Error) {
      console.error('Error en el login', error.message);
      this.errorMessage = error.message;
      this.errorMessages = {}; // Resetea los mensajes de error
    } else if (typeof error === 'string') {
      console.error('Error en el login', error);
      this.errorMessage = error;
      this.errorMessages = {};
    } else {
      // Si el error es un objeto que no es una instancia de Error, lo manejamos de otra forma
      console.error('Error desconocido', error);
      this.errorMessage = '';
      this.errorMessages = {};  // O cualquier otro comportamiento que quieras manejar
    }
  }
}

  
  /*
  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(
        (response) => {
          console.log('Login exitoso', response);
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
  }*/
}
