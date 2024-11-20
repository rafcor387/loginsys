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

  constructor(private http: HttpClient, private router: Router) {}

  // Función para enviar los datos al backend
  submitForm() {
    if (!this.idRepuesto || !this.anio) {
      this.errorMessage = 'Por favor complete todos los campos antes de enviar.';
      return;
    }

    const data = { id_repuesto: this.idRepuesto, anio: this.anio };

    this.http.post('http://127.0.0.1:8000/api/llenar-test-reg', data).subscribe(
      (response: any) => {
        // Si el proceso fue exitoso, redirigimos al usuario a la página de predicción
        this.router.navigate([`/sales-prediction/${this.idRepuesto}`]);
      },
      (error) => {
        // Si ocurre un error, mostramos un mensaje de error
        console.error('Error al procesar los datos:', error);

        // Aquí verificamos si el error tiene un mensaje específico del backend
        if (error.error && error.error.error) {
          this.errorMessage = error.error.error; // Mensaje personalizado del backend
        } else {
          this.errorMessage = 'Hubo un error al procesar los datos. Intente de nuevo.';
        }
      }
    );
  }
}
