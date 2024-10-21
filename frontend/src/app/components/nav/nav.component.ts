import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent  implements OnInit {
  usuario: any; // Para almacenar la información del usuario

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (response) => {
        this.usuario = response; // Guardar la información del usuario
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );

  }

  // Método que se llamará al hacer clic en el botón de cerrar sesión
  logout() {
    this.authService.logout();
    //window.location.reload();
  }
}
