import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RegisterRepuestoComponent } from './register-repuesto/register-repuesto.component';
import { UpdateRepuestoComponent } from './update-repuesto/update-repuesto.component';


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
    private modalController: ModalController
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
    this.errorMessage='';
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
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener los repuestos:', error);
        this.errorMessage = error;
      }
    );
  }

  


  eliminarRepuesto(repuestoId: number) {
    this.authService.eliminarRepuesto(repuestoId).subscribe(
      (response) => {
        console.log('Repuesto eliminado:', response);
        this.LoadRepuestos(); // Vuelve a listar los repuestos
      },
      (error) => {
        console.error('Error al eliminar el repuesto:', error);
        this.errorMessage = error; // Manejo de errores
      }
    );
  }

}
