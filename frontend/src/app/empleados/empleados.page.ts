import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { RegisterEmpleadoComponent } from './register-empleado/register-empleado.component'; // Importa el nuevo componente
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  empleados: any[] = []; // Array para almacenar los empleados

  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoadEmpleados(); // Llamar al método al inicializar la página
  }
  /*
  CreateUser(idEmpleado: number) {
    this.router.navigate(['/register', { id_empleado: idEmpleado }]);
  }*/

  CreateUser(idEmpleado: number) {
    this.authService.checkEmpleado(idEmpleado).subscribe(response => {
      if (!response.exists) {
        this.router.navigate(['/register', { id_empleado: idEmpleado }]);
      } else {
        // Si el empleado ya existe, puedes proceder con otra lógica
        console.log('El id_empleado ya está registrado.');
      }
    }, error => {
      console.error('Error al verificar el id_empleado:', error);
    });
    
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

  async openUpdateModal(empleado: any) {
    const modal = await this.modalController.create({
      component: UpdateEmpleadoComponent,
      componentProps: { empleado: { ...empleado } }, // Pass a copy of the repuesto
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Update the empleados array with the updated empleado
        const index = this.empleados.findIndex((r) => r.id === data.data.id);
        if (index !== -1) {
          this.empleados[index] = data.data;
        }
      }
    });
    return await modal.present();
  }

  async openRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterEmpleadoComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.empleados.push(data.data); // Agrega el nuevo empleado a la lista
      }
    });
    return await modal.present();
  }
}
