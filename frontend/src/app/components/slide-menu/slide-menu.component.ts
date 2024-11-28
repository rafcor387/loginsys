import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-slide-menu',
  templateUrl: './slide-menu.component.html',
  styleUrls: ['./slide-menu.component.scss'],
})
export class SlideMenuComponent implements OnInit {
  userRole: number = 0;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private menuCtrl: MenuController) {}

  ngOnInit() {
    // Escucha los cambios en el estado de autenticación
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;

      if (this.isAuthenticated) {
        const storedRoleId = localStorage.getItem('role_id');
        if (storedRoleId) {
          this.userRole = parseInt(storedRoleId, 10);
          console.log('Desde el slide-menu, decimo ID-role:', this.userRole);
        }
      }
    });
  }

  // Función para cerrar el menú lateral
  closeMenu() {
    this.menuCtrl.close(); // Cierra el menú abierto actualmente
  }
}
