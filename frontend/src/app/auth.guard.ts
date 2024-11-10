// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirigir si no está autenticado
      return false;
    }

    // Obtener el role_id del Local Storage
    const roleId = localStorage.getItem('role_id');

    // Obtener los roles permitidos para la ruta desde el parámetro de datos
    const allowedRoles = next.data['allowedRoles'];

    // Verificar si el role_id está en la lista de roles permitidos
    if (allowedRoles && allowedRoles.includes(Number(roleId))) {
      return true; // Permitir el acceso si tiene el rol correcto
    }

    this.router.navigate(['/home']); // Redirigir si no tiene el rol adecuado
    return false; // Denegar acceso
  }
}



