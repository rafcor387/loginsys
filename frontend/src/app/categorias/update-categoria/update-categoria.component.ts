import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.scss'],
})
export class UpdateCategoriaComponent implements OnInit {
  @Input() categoria: any;
  errorMessage: string = '';
  errorMessages: { [key: string]: string } = {};

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  updateCategoria() {
    this.authService
      .actualizarCategoria(this.categoria.id, this.categoria)
      .subscribe(
        (response) => {
          console.log('Categoria actualizado:', response);
          this.modalController.dismiss(response); // Cierra el modal y devuelve el json de exito
        },
        (error) => {
          console.error('Error al actualizar la marca:', error);
          if (typeof error === 'string') {
            this.presentAlert(error);
            this.errorMessages = {}; // Limpia los mensajes de error de campo
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
