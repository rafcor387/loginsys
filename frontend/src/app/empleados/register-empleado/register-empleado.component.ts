import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-empleado',
  templateUrl: './register-empleado.component.html',
  styleUrls: ['./register-empleado.component.scss'],
})
export class RegisterEmpleadoComponent implements OnInit {
  nuevoEmpleado = {
    ci: '',
    nombres: '',
    apellidos: '',
    id_cargo: '',
    telefono: '',
    email: '',
    direccion: '',
    fecha_contratacion: new Date().toLocaleDateString('en-CA'),
    salario: 1000.0,
  };
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

  AddEmpleado() {
    this.authService.AgregarEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        this.modalController.dismiss({
          successMessage: response.message,
        });
      },
      (error) => {
        console.error('Error al agregar el empleado:', error);
  
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

  close() {
    this.modalController.dismiss();
  }
}
