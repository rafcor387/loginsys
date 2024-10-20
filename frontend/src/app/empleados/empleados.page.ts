import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UpdateRepuestoModalComponent } from '../components/update-repuesto-modal/update-repuesto-modal.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  empleados: any[] = []; // Array para almacenar los empleados
  nuevoEmpleado = {
    ci: '',
    nombres: '',
    apellidos: '',
    id_cargo: 2,
    telefono: '',
    email: '',
    direccion: '',
    fecha_contratacion: new Date().toISOString().substring(0, 10), // Formato 'YYYY-MM-DD'
    salario: 0,
  };
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoadEmpleados(); // Llamar al método al inicializar la página
  }

  LoadEmpleados() {
    this.authService.ListarEmpleados().subscribe(
      (response) => {
        this.empleados = response; // Guardar los datos en el array
        this.errorMessage = ''; // Limpiar cualquier error
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
        this.errorMessage = error; // Almacenar el mensaje de error
      }
    );
  }

  CreateUser(idEmpleado: number) {
    this.router.navigate(['/register', { id_empleado: idEmpleado }]);
  }

  AddEmpleado() {
    this.authService.AgregarEmpleado(this.nuevoEmpleado).subscribe(
      (response) => {
        this.empleados.push(response); // Agregar el nuevo repuesto a la lista
        this.nuevoEmpleado = {
          // Reiniciar el formulario
          ci: '',
          nombres: '',
          apellidos: '',
          id_cargo: 2,
          telefono: '',
          email: '',
          direccion: '',
          fecha_contratacion: new Date().toISOString().substring(0, 10), // Formato 'YYYY-MM-DD'
          salario: 0,
        };
        this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
      },
      (error) => {
        console.error('Error al agregar el empleado:', error);
        this.errorMessage = error; // Almacenar el mensaje de error
      }
    );
  }

  DeleteEmpleado(empleadoId: number) {
    this.authService.EliminarEmpleado(empleadoId).subscribe(
      (response) => {
        console.log('Empleado eliminado:', response);
        this.LoadEmpleados();
      },
      (error) => {
        console.error('Error al eliminar el empleado:', error);
        this.errorMessage = error;
      }
    );
  }
}
