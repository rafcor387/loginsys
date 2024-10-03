import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que el path sea correcto

@Component({
  selector: 'app-update-repuesto-modal',
  templateUrl: './update-repuesto-modal.component.html',
  styleUrls: ['./update-repuesto-modal.component.scss'],
})
export class UpdateRepuestoModalComponent {
  @Input() repuesto: any; // Input property to receive the repuesto data
  errorMessage: string = ''; // Para mostrar errores en el template

  constructor(
    private modalController: ModalController,
    private authService: AuthService // Inyectamos el AuthService
  ) {}

  // Método para actualizar el repuesto
  updateRepuesto() {
    this.authService.updateRepuesto(this.repuesto.id, this.repuesto).subscribe(
      (response) => {
        console.log('Repuesto actualizado:', response);
        this.modalController.dismiss(response); // Cierra el modal y devuelve el repuesto actualizado
      },
      (error) => {
        console.error('Error al actualizar el repuesto:', error);
        this.errorMessage = error; // Mostrar el error en el template
      }
    );
  }

  // Método para cerrar el modal
  closeModal() {
    this.modalController.dismiss();
  }
}
