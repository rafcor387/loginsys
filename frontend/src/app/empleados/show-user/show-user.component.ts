import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss'],
})
export class ShowUserComponent {
  @Input() user: any;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }

}
