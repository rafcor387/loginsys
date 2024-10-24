import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {
  userRole: number = 0;
  isAuthenticated: boolean = false;

  constructor() {}

  ngOnInit() {
    // Recupera el 'role_id' del localStorage si existe y conviértelo a número
    const storedRoleId = localStorage.getItem('role_id');
    if (storedRoleId) {
      this.userRole = parseInt(storedRoleId, 10);
    }


     // Verifica si el token de autenticación está presente en el localStorage
     const token = localStorage.getItem('token');
     this.isAuthenticated = !!token; // Se convierte en `true` si hay un token, `false` si no.
  }
}
