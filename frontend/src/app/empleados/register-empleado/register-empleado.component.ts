import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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
  essage: string = '';
  cargos: any[] = []; // Array para almacenar cargos

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.LoadCargos();
  }

  AddEmpleado() {
    this.authService.AgregarEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        // Cierra el modal y pasa tanto el nuevo empleado como el mensaje de éxito
        this.modalController.dismiss({
          successMessage: response.message, // Asumiendo que response.message contiene el mensaje de éxito
        });
      },
      (error) => {
        console.error('Error al agregar el empleado:', error);
        this.errorMessage = error; // Almacenar el mensaje de error
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

  close() {
    this.modalController.dismiss(); // Cierra el modal sin enviar datos
  }
}
