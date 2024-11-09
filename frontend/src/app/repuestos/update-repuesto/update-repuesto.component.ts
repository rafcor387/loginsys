import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-repuesto',
  templateUrl: './update-repuesto.component.html',
  styleUrls: ['./update-repuesto.component.scss'],
})
export class UpdateRepuestoComponent implements OnInit {
  @Input() repuesto: any; // Input property to receive the repuesto data
  errorMessage: string = ''; // Para mostrar errores en el template
  categorias: any[] = []; // Array para almacenar categorías
  marcas: any[] = []; // Array para almacenar marcas
  errorMessages: { [key: string]: string } = {};

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.LoadCategorias();
    this.LoadMarcas();
  }

  updateRepuesto() {
    this.authService
      .actualizarRepuesto(this.repuesto.id, this.repuesto)
      .subscribe(
        (response) => {
          console.log('Repuesto actualizado:', response);
          this.modalController.dismiss(response); // Cierra el modal y devuelve el json de exito
        },
        (error) => {
          console.error('Error al actualizar el repuesto:', error);
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

  LoadCategorias() {
    this.authService.listarCategorias().subscribe(
      (response) => {
        this.categorias = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
        this.errorMessage = error;
      }
    );
  }

  LoadMarcas() {
    this.authService.listarMarcas().subscribe(
      (response) => {
        this.marcas = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
        this.errorMessage = error;
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
