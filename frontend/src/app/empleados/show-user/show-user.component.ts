import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss'],
})
export class ShowUserComponent {
  @Input() responseData: any; // Recibirás el `response` aquí

  constructor(private modalController: ModalController) {}

  closeModal() {
    this.modalController.dismiss(); // Cerrar el modal
  }

}
