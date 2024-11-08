import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-empleado',
  templateUrl: './update-empleado.component.html',
  styleUrls: ['./update-empleado.component.scss'],
})
export class UpdateEmpleadoComponent implements OnInit {
  @Input() empleado: any; 
  errorMessage: string = ''; 
  errorMessages: { [key: string]: string } = {};
  cargos: any[] = []; 

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.LoadCargos();
  }

  // Método para actualizar el repuesto
  updateEmpleado() {
    this.authService.ActualizarEmpleado(this.empleado.id, this.empleado).subscribe(
      (response) => {
        console.log('Empleado actualizado:', response);
        this.modalController.dismiss(response);
      },
      (error) => {
        console.error('Error al actualizar el empleado:', error);
        if (typeof error === 'string') {
          this.presentAlert(error);
          this.errorMessages = {}; // Limpia los mensajes de error de campo
        } else {
          this.errorMessages = error;
        }
      }
    );
  }

  LoadCargos() {
    this.authService.listarCargos().subscribe(
      (response) => {
        this.cargos = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
        this.errorMessage = error;
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