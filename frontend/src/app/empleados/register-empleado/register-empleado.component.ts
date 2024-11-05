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
    fecha_contratacion: new Date().toISOString().substring(0, 10),
    salario: 1000.0,
  };
  errorMessage: string = '';
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
        this.modalController.dismiss(response); // Cierra el modal y pasa el nuevo empleado
        window.location.reload();
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
