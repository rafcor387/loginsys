import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userEmail: string | null = null; // Variable para almacenar el email

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserEmail(); // Llama al método para cargar el email al iniciar
  }

  loadUserEmail() {
    this.authService.getUserEmail().subscribe(
      (response) => {
        this.userEmail = response.email; // Asigna el email a la variable
      },
      (error) => {
        console.error('Error al obtener el email', error);
      }
    );
  }

  // Método para cerrar sesión
  onLogout() {
    this.authService.logout().subscribe(response => {
      console.log(response.message); // Mostrar mensaje de éxito
      localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
      this.router.navigate(['/login']); // Redirigir al login
    }, error => {
      console.error('Error en el logout', error); // Manejar errores
    });
  }
}
