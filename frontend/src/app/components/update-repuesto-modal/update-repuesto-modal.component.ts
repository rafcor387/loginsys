import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-update-repuesto-modal',
  templateUrl: './update-repuesto-modal.component.html',
  styleUrls: ['./update-repuesto-modal.component.scss'],
})
export class UpdateRepuestoModalComponent {
  @Input() repuesto: any; // Input property to receive the repuesto data
  apiUrl: string = 'http://project.test/backend/public/api/repuestos'; // URL of the API

  constructor(private modalController: ModalController) {}

  updateRepuesto() {
    axios
      .put(`${this.apiUrl}/${this.repuesto.id}`, this.repuesto)
      .then((response) => {
        console.log('Repuesto actualizado:', response.data);
        this.modalController.dismiss(response.data); // Dismiss the modal and return the updated repuesto
      })
      .catch((error) => {
        console.error('Error al actualizar el repuesto:', error);
      });
  }

  closeModal() {
    this.modalController.dismiss();
  }
}