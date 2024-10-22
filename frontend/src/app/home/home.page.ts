import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  userEmail: string | null = null; // Variable para almacenar el email

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    // Initialize the Bootstrap carousel
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
      const carousel = new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 3000, // Change slide every 3 seconds
        wrap: true // Loop back to the start
      });
    }
  }

  ngOnInit() {
    this.loadUserEmail(); // Llama al método para cargar el email al iniciar
  }

  loadUserEmail() {
    this.authService.getUser().subscribe(
      (response) => {
        this.userEmail = response.email; // Asigna el email a la variable
      },
      (error) => {
        console.error('Error al obtener el email', error);
      }
    );
  }

  // Método que se llamará al hacer clic en el botón de cerrar sesión
  logout() {
    this.authService.logout();
  }

}
