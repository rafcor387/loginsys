import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RegisterRepuestoComponent } from './register-repuesto/register-repuesto.component';
import { UpdateRepuestoComponent } from './update-repuesto/update-repuesto.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  repuestos: any[] = [];
  Message: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    this.LoadRepuestos();
  }

  async openRegisterModal() {
    this.Message = '';
    this.errorMessage = '';
    const modal = await this.modalController.create({
      component: RegisterRepuestoComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadRepuestos();
        this.Message = data.data.successMessage;
      }
    });
    return await modal.present();
  }

  async openUpdateModal(repuesto: any) {
    this.Message = '';
    this.errorMessage = '';
    const modal = await this.modalController.create({
      component: UpdateRepuestoComponent,
      componentProps: { repuesto: { ...repuesto } },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadRepuestos();
        this.Message = data.data.message;
      }
    });
    return await modal.present();
  }

  LoadRepuestos() {
    this.authService.repuestosListar().subscribe(
      (response) => {
        this.repuestos = response;
        console.log('Repuestos:', this.repuestos); // Agrega este log
        //this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener los repuestos:', error);
        this.errorMessage = error;
      }
    );
  }

  DeleteRepuesto(repuestoId: number) {
    this.Message = '';
    this.errorMessage = '';
    this.alertController
      .create({
        header: 'Confirmar Eliminación',
        message: '¿Está seguro de que desea eliminar este repuesto?',
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
              this.authService.eliminarRepuesto(repuestoId).subscribe(
                (response) => {
                  this.LoadRepuestos();
                  this.Message = response.message;
                },
                (error) => {
                  console.error('Error al eliminar el repuesto:', error);
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
