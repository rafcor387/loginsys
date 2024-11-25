import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-grafico',
  templateUrl: './solicitud-grafico.page.html',
  styleUrls: ['./solicitud-grafico.page.scss'],
})
export class SolicitudGraficoPage {
  idRepuesto: number = 0;
  anio: number = 0;
  errorMessage: string = ''; // Variable para mostrar el mensaje de error
  years: number[] = []; // Array para almacenar los años
  dataProcessed: boolean = false; // Track if data has been processed

  constructor(private http: HttpClient, private router: Router) {
    this.generateYears(); // Generate years on component initialization
  }

  // Generate years from 2000 to the current year
  generateYears() {
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  // Función para enviar los datos al backend
  submitForm() {
    this.errorMessage = ''; // Reset error message before submission
    this.dataProcessed = false; // Reset data processed flag
    if (!this.idRepuesto || !this.anio) {
      this.errorMessage = 'Por favor complete todos los campos antes de enviar.';
      return;
    }

    const data = { id_repuesto: this.idRepuesto, anio: this.anio };

    this.http.post('https://izzicode-production.up.railway.app/api/llenar-test-reg', data).subscribe(
      (response: any) => {
        // Check if the response indicates data has been processed
        if (response.message) {
          this.dataProcessed = true; // Set flag to true
          this.errorMessage = response.message; // Show the message

          // Set a timer to redirect after 5 seconds
          setTimeout(() => {
            this.router.navigate([`/sales-prediction/${this.idRepuesto}`]);
          }, 5000); // 5000 milliseconds = 5 seconds
        }
      },
      (error) => {
        // Handle error as before
        console.error('Error al procesar los datos:', error);
        this.errorMessage = error.error.message || 'Hubo un error al procesar los datos. Intente de nuevo.';
      }
    );
  }
}