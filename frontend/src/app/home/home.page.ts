import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar el servicio
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { NavComponent } from '../components/nav/nav.component';

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
  }

  ngOnInit() {
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
      const carousel = new (window as any).bootstrap.Carousel(carouselElement, {
        interval: 2200, // Change slide every 3 seconds
        wrap: true, // Loop back to the start
      });
    }
    //ngAfterViewInit();
    //this.loadUserEmail(); // Llama al método para cargar el email al iniciar
  }

  // Método que se llamará al hacer clic en el botón de cerrar sesión
  logout() {
    this.authService.logout();
  }
}
