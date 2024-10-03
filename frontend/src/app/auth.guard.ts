import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
//import { AuthService } from 'services/auth.service';
/*
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token existe, permite el acceso
      return true;
    } else {
      // Si no hay token, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}*/
