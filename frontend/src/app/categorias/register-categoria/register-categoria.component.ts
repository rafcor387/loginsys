import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  // Agregar una nueva categoría
  AddCategoria() {
    this.authService.AgregarCategoria(this.nuevacategoria).subscribe(
      (response) => {
        this.modalController.dismiss({
          successMessage: response.message, // Asumiendo que response.message contiene el mensaje de éxito
        });
      },
      (error) => {
        console.error('Error al agregar la categoría:', error);
        this.errorMessage = error;
      }
    );
  }

  close() {
    this.modalController.dismiss();
  }
}
