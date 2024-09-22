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

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password })
      .subscribe(response => {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/home']); // Cambia esto según tu estructura
      }, error => {
        console.error('Error en el login', error);
      });
  }
}