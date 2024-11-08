import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-categoria',
  templateUrl: './register-categoria.component.html',
  styleUrls: ['./register-categoria.component.scss'],
})
export class RegisterCategoriaComponent implements OnInit {
  nuevacategoria = {
    nombre: '',
    descripcion: '',
  };
  errorMessage: string = '';
  errorMessages: { [key: string]: string } = {};

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  // Agregar una nueva categoría
  AddCategoria() {
    this.authService.AgregarCategoria(this.nuevacategoria).subscribe(
      (response) => {
        this.modalController.dismiss({
          successMessage: response.message, 
        });
      },
      (error) => {
        console.error('Error al agregar la categoría:', error);
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

  close() {
    this.modalController.dismiss();
  }
}
