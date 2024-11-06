import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { RegisterEmpleadoComponent } from './register-empleado/register-empleado.component';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  empleados: any[] = []; // Array para almacenar los empleados
  usuariosExistentes: { [key: number]: boolean } = {}; // Para almacenar el estado de existencia
  //usuarios: { [key: number]: any } = {}; // Para almacenar el estado de existencia
  user: any[] = [];
  errorMessage: string = ''; // Variable para almacenar el mensaje de error
  Message: string = '';

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.LoadEmpleados();
  }

  async openRegisterModal() {
    this.Message = '';
    this.errorMessage='';
    const modal = await this.modalController.create({
      component: RegisterEmpleadoComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadEmpleados();
        this.Message = data.data.successMessage;
      }
    });
    return await modal.present();
  }

  async openUpdateModal(empleado: any) {
    this.Message = '';
    this.errorMessage='';
    const modal = await this.modalController.create({
      component: UpdateEmpleadoComponent,
      componentProps: { empleado: { ...empleado } },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadEmpleados();
        this.Message = data.data.message;
      }
    });
    return await modal.present();
  }

  async eliminarUsuario(idEmpleado: number) {
    this.Message = '';
    this.errorMessage='';
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.authService.eliminarUsuario(idEmpleado).subscribe(
              (response) => {
                this.LoadEmpleados();
                console.log('Usuario eliminado con éxito:', response);
                this.Message = response.message;
                // Aquí podrías refrescar la lista de usuarios o mostrar una notificación
              },
              (error) => {
                console.error('Error al eliminar el usuario:', error);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  DeleteEmpleado(empleadoId: number) {
    this.Message = '';
    this.errorMessage='';
    this.alertController
      .create({
        header: 'Confirmar Eliminación',
        message: '¿Está seguro de que desea eliminar este empleado?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              // Aquí no se hace nada, se cierra la alerta
              console.log('Eliminación cancelada');
            },
          },
          {
            text: 'Sí',
            handler: () => {
              // Si el usuario confirma, proceder a eliminar
              this.authService.EliminarEmpleado(empleadoId).subscribe(
                (response) => {
                  this.LoadEmpleados();
                  this.Message = response.message;
                },
                (error) => {
                  console.error('Error al eliminar el empleado:', error);
                  this.errorMessage = error; // Manejar el error
                }
              );
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async Create_User(idEmpleado: number) {
    this.Message = '';
    this.errorMessage='';
    this.authService.createUser(idEmpleado).subscribe(
      async (response) => {
        console.log('Usuario creado:', response);
        await this.CreateUserAlert(response);
        this.LoadEmpleados();
        this.Message = response.message;
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        this.errorMessage = error;
      }
    );
  }

  async CreateUserAlert(responseData: any) {
    const alert = await this.alertController.create({
      header: `${responseData.message}`,
      message: `
      Código: ${responseData.codigo}\t\t\t\t\t\t\t\tContraseña: ${responseData.password}`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  verificarUsuarios() {
    this.empleados.forEach((empleado) => {
      this.authService
        .verificarUsuarioPorEmpleado(empleado.id)
        .subscribe((res) => {
          this.usuariosExistentes[empleado.id] = res.exists; //exists es false o true
          //this.usuarios[empleado.id] = res.user;
        });
    });
  }

  LoadEmpleados() {
    this.authService.ListarEmpleados().subscribe(
      (response) => {
        this.empleados = response.empleados; // Guardar los datos en el array
        this.verificarUsuarios();
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
        this.errorMessage = error; // Almacenar el mensaje de error
      }
    );
  }

  async showEmpleadoDetails(empleado: any) {
    this.Message = '';
    this.errorMessage='';
    const actionSheet = await this.actionSheetController.create({
      header: 'Detalles del Empleado',
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
        },
        {
          text: 'CI: ' + empleado.ci,
          role: 'default',
        },
        {
          text: 'Nombres: ' + empleado.nombres,
          role: 'default',
        },
        {
          text: 'Apellidos: ' + empleado.apellidos,
          role: 'default',
        },
        {
          text: 'Cargo: ' + empleado.cargo?.nombre,
          role: 'default',
        },
        {
          text: 'Teléfono: ' + empleado.telefono,
          role: 'default',
        },
        {
          text: 'Email: ' + empleado.email,
          role: 'default',
        },
        {
          text: 'Dirección: ' + empleado.direccion,
          role: 'default',
        },
        {
          text: 'Fecha de Contratación: ' + empleado.fecha_contratacion,
          role: 'default',
        },
        {
          text: 'Salario: ' + empleado.salario,
          role: 'default',
        },
      ],
    });
    await actionSheet.present();
  }
}
