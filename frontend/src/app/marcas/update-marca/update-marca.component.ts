import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-marca',
  templateUrl: './update-marca.component.html',
  styleUrls: ['./update-marca.component.scss'],
})
export class UpdateMarcaComponent  implements OnInit {
  @Input() marca: any; 
  errorMessage: string = ''; 
  errorMessages: { [key: string]: string } = {};

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit() {}

  updateMarca() {
    this.authService.actualizarMarca(this.marca.id, this.marca).subscribe(
      (response) => {
        console.log('Marca actualizado:', response);
        this.modalController.dismiss(response); 
      },
      (error) => {
        console.error('Error al actualizar la marca:', error);
        if (typeof error === 'string') {
          this.presentAlert(error);
          this.errorMessages = {}; 
        } else {
          this.errorMessages = error;
        }
      }
    );
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }


  closeModal() {
    this.modalController.dismiss();
  }

}
