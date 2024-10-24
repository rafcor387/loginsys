import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Asegúrate de importar el servicio


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent  implements OnInit {
  usuario: any; 
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      (response) => {
        this.usuario = response; 
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );

    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token; 

  }

  logout() {
    this.authService.logout();
    //window.location.reload();
  }
}
