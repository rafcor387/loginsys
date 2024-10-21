import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-empleado',
  templateUrl: './register-empleado.component.html',
  styleUrls: ['./register-empleado.component.scss'],
})
export class RegisterEmpleadoComponent {
  nuevoEmpleado = {
    ci: '',
    nombres: '',
    apellidos: '',
    id_cargo: 2,
    telefono: '',
    email: '',
    direccion: '',
    fecha_contratacion: new Date().toISOString().substring(0, 10),
    salario: 0,
  };
  errorMessage: string = '';

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  AddEmpleado() {
    this.authService.AgregarEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        this.modalController.dismiss(response); // Cierra el modal y pasa el nuevo empleado
      },
      (error) => {
        console.error('Error al agregar el empleado:', error);
        this.errorMessage = error; // Almacenar el mensaje de error
      }
    );
  }

  close() {
    this.modalController.dismiss(); // Cierra el modal sin enviar datos
  }
}
