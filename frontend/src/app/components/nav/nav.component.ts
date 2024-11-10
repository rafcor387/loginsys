import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  usuario: any;
  isAuthenticated: boolean = false;
  isMobile: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isMobile = window.innerWidth <= 600; // Considera 'móvil' si la pantalla es menor a 600px

    // Escucha los cambios en el estado de autenticación
    this.authService.authStatus$.subscribe((status) => {
      this.isAuthenticated = status;
      if(this.isAuthenticated){
        this.authService.getUser().subscribe(
          (response) => {
            this.usuario = response;
          },
          (error) => {
            console.error('Error al obtener el usuario:', error);
          }
        );
      }
      
    });

    // Escucha cambios en el tamaño de la pantalla para actualizaciones en tiempo real
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 600;
    });
  }

  logout() {
    this.authService.logout();
  }
}
