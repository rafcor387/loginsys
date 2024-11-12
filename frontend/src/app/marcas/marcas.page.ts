import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RegisterMarcaComponent } from './register-marca/register-marca.component';
import { UpdateMarcaComponent } from './update-marca/update-marca.component';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {
  marcas: any[] = []; // Lista de marcas
  errorMessage: string = ''; // Mensaje de error
  Message: string = '';

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.Message = '';
    this.errorMessage = '';
    this.LoadMarcas(); // Cargar marcas al iniciar
  }

  // Cargar todas las marcas
  LoadMarcas() {
    this.authService.listarMarcas().subscribe(
      (response) => {
        this.marcas = response;
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
        this.errorMessage = error;
      }
    );
  }

  async openRegisterModal() {
    this.Message = '';
    this.errorMessage = '';
    const modal = await this.modalController.create({
      component: RegisterMarcaComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadMarcas();
        this.Message = data.data.successMessage;
      }
    });
    return await modal.present();
  }

  async openUpdateModal(marca: any) {
    this.Message = '';
    this.errorMessage = '';
    const modal = await this.modalController.create({
      component: UpdateMarcaComponent,
      componentProps: { marca: { ...marca } },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadMarcas();
        this.Message = data.data.message;
      }
    });
    return await modal.present();
  }

  /*
  // Eliminar una marca
  DeleteMarca(marcaId: number) {
    this.authService.eliminarMarca(marcaId).subscribe(
      (response) => {
        console.log('Marca eliminada:', response);
        this.LoadMarcas(); // Recargar la lista de marcas
      },
      (error) => {
        console.error('Error al eliminar la marca:', error);
        this.errorMessage = error;
      }
    );
  }*/

  DeleteMarca(marcaId: number) {
    this.Message = '';
    this.errorMessage = '';
    this.alertController
      .create({
        header: 'Confirmar Eliminación',
        message: '¿Está seguro de que desea eliminar?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Eliminación cancelada');
            },
          },
          {
            text: 'Sí',
            handler: () => {
              this.authService.eliminarMarca(marcaId).subscribe(
                (response) => {
                  //this.LoadEmpleados();
                  this.LoadMarcas();
                  this.Message = response.message;
                },
                (error) => {
                  console.error('Error al eliminar la marca:', error);
                  this.errorMessage = error; // Manejar el error
                }
              );
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
