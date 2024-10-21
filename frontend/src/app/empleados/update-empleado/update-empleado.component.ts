import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que el path sea correcto

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.scss'],
})
export class UpdateEmpleadoComponent {
  @Input() empleado: any; // Input property to receive the repuesto data
  errorMessage: string = ''; // Para mostrar errores en el template

  constructor(
    private modalController: ModalController,
    private authService: AuthService // Inyectamos el AuthService
  ) {}

  // Método para actualizar el repuesto
  updateEmpleado() {
    this.authService.ActualizarEmpleado(this.empleado.id, this.empleado).subscribe(
      (response) => {
        console.log('Empleado actualizado:', response);
        this.modalController.dismiss(response); // Cierra el modal y devuelve el repuesto actualizado
        window.location.reload();
      },
      (error) => {
        console.error('Error al actualizar el empleado:', error);
        this.errorMessage = error; // Mostrar el error en el template
      }
    );
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }
}
