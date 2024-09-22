import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation })
      .subscribe(response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']); // Redirigir al login
      }, error => {
        console.error('Error en el registro', error);
      });
  }
  
}