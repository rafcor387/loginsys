import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-marca',
  templateUrl: './register-marca.component.html',
  styleUrls: ['./register-marca.component.scss'],
})
export class RegisterMarcaComponent implements OnInit {
  nuevaMarca = {
    nombre: '',
    pais: '',
    email: '',
    direccion: '',
    telefono: '',
    sitio_web: '',
    descripcion: '',
  };
  errorMessage: string = '';
  errorMessages: { [key: string]: string } = {};

  // Lista de países
  countries: string[] = [
    'Alemania', 'Argentina', 'Australia', 'Bolivia', 'Brasil', 'Canadá', 'Chile', 'China', 
    'Colombia', 'Corea del Sur', 'España', 'Estados Unidos', 'Francia', 'Inglaterra', 
    'Italia', 'Japón', 'México', 'Perú', 'Reino Unido', 'Suecia', 'Uruguay'];



  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  AddMarca() {
    this.authService.AgregarMarca(this.nuevaMarca).subscribe(
      (response) => {
        this.modalController.dismiss({
          successMessage: response.message, // Asumiendo que response.message contiene el mensaje de éxito
        });
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
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
