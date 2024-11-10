import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {
  userRole: number = 0;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Escucha los cambios en el estado de autenticación
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;

      if (this.isAuthenticated) {
        const storedRoleId = localStorage.getItem('role_id');
        if (storedRoleId) {
          this.userRole = parseInt(storedRoleId, 10);
          console.log('Desde el slide-menu, decimo ID-role:',this.userRole);
        }
      }
    });

    // Recupera el 'role_id' del localStorage si existe y conviértelo a número

    /*
    // Verifica si el token de autenticación está presente en el localStorage
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token; // Se convierte en `true` si hay un token, `false` si no.
    */
  }
}
