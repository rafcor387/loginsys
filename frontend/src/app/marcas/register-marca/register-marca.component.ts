import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private modalController: ModalController,
    private authService: AuthService
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
        this.errorMessage = error;
      }
    );
  }

  close() {
    this.modalController.dismiss();
  }
}
