import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Asegúrate de importar correctamente tu servicio
import { ToastController } from '@ionic/angular'; // Si usas Ionic para mostrar notificaciones

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: any[] = []; // Almacenar la lista de clientes
  clienteActual: any = {}; // Modelo para agregar o editar un cliente
  editandoCliente: any = null; // Indicar si estamos en modo edición

  constructor(
    private authService: AuthService,
    private toastController: ToastController // Para mostrar mensajes
  ) {}
  ngOnInit() {
    this.listarClientes(); // Cargar la lista de clientes al iniciar
  }
  // Método para listar clientes
  listarClientes() {
    this.authService.ListarClientes().subscribe({
      next: (data) => {
        console.log('Datos de clientes:', data); // Verifica qué estás recibiendo
        this.clientes = data.clientes || []; // Asignar correctamente el array de clientes
      },
      error: (err) => {
        this.mostrarToast('Error al cargar la lista de clientes.');
        console.error('Error al cargar clientes:', err);
      },
    });
  }
  agregarCliente() {
    console.log(this.clienteActual); // Verifica los datos enviados
    this.authService.AgregarCliente(this.clienteActual).subscribe({
      next: (data) => {
        this.mostrarToast('Cliente agregado exitosamente.');
        this.listarClientes();
        this.clienteActual = {};
      },
      error: (err) => {
        console.error(err); // Muestra el error completo en la consola
        this.mostrarToast('Error al agregar el cliente.');
      },
    });
  }
  // Método para eliminar un cliente
  eliminarCliente(clienteId: number) {
    this.authService.EliminarCliente(clienteId).subscribe({
      next: () => {
        this.mostrarToast('Cliente eliminado exitosamente.');
        this.listarClientes(); // Actualizar la lista
      },
      error: (err) => {
        this.mostrarToast('Error al eliminar el cliente.');
      },
    });
  }

  // Método para iniciar la edición de un cliente
  editarCliente(cliente: any) {
    this.clienteActual = { ...cliente }; // Clonar el cliente seleccionado
    this.editandoCliente = cliente; // Establecer el cliente en edición
  }

  // Método para actualizar un cliente
  actualizarCliente() {
    if (this.editandoCliente) {
      this.authService
        .ActualizarCliente(this.editandoCliente.id, this.clienteActual)
        .subscribe({
          next: () => {
            this.mostrarToast('Cliente actualizado exitosamente.');
            this.listarClientes(); // Actualizar la lista
            this.clienteActual = {}; // Limpiar el formulario
            this.editandoCliente = null; // Finalizar edición
          },
          error: (err) => {
            this.mostrarToast('Error al actualizar el cliente.');
          },
        });
    }
  }

  // Método para cancelar la edición
  cancelarEdicion() {
    this.clienteActual = {}; // Limpiar el cliente actual
    this.editandoCliente = null; // Finalizar edición
  }

  // Método para mostrar notificaciones
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000, // Duración en milisegundos
      position: 'top',
    });
    toast.present();
  }
}
