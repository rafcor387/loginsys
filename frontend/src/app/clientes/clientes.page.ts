import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clientes: any[] = []; // Lista de clientes
  clienteActual: any = {}; // Datos del cliente actual
  editandoCliente: any = null; // Indica si se está editando un cliente
  errorMessages: { [key: string]: string } = {}; // Mensajes de error

  constructor(
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.listarClientes(); // Cargar clientes al inicio
  }

  listarClientes() {
    this.authService.ListarClientes().subscribe({
      next: (data) => {
        this.clientes = data.clientes || [];
      },
      error: () => {
        this.mostrarToast('Error al cargar la lista de clientes.');
      },
    });
  }

  agregarCliente() {
    if (this.validarFormulario()) {
      this.authService.AgregarCliente(this.clienteActual).subscribe({
        next: () => {
          this.mostrarToast('Cliente agregado exitosamente.');
          this.listarClientes();
          this.clienteActual = {};
          this.errorMessages = {}; // Clear any existing error messages
        },
        error: (err) => {
          console.error(err); // Keep this for debugging
          
          if (err.error?.validationError) {
            // Handle validation errors
            this.errorMessages = err.error.validationError;
            // Show a general validation error message
            this.mostrarToast('Por favor corrija los errores en el formulario.');
          } else {
            // Handle other types of errors
            const errorMessage = err.error?.messageError || err.message || 'Error desconocido';
            this.mostrarToast('Error al agregar el cliente: ' + errorMessage);
            this.errorMessages = {};
          }
        },
      });
    }
  }

  editarCliente(cliente: any) {
    this.clienteActual = { ...cliente }; // Clonar el cliente
    this.editandoCliente = cliente;
  }

  actualizarCliente() {
    if (this.editandoCliente && this.validarFormulario()) {
      this.authService
        .ActualizarCliente(this.editandoCliente.id, this.clienteActual)
        .subscribe({
          next: () => {
            this.mostrarToast('Cliente actualizado exitosamente.');
            this.listarClientes();
            this.cancelarEdicion();
            this.errorMessages = {}; // Clear any existing error messages
          },
          error: (err) => {
            console.error(err);
            
            if (err.error?.validationError) {
              // Handle validation errors
              this.errorMessages = err.error.validationError;
              // Show a general validation error message
              this.mostrarToast('Por favor corrija los errores en el formulario.');
            } else {
              // Handle other types of errors
              const errorMessage = err.error?.messageError || err.message || 'Error desconocido';
              this.mostrarToast('Error al actualizar el cliente: ' + errorMessage);
              this.errorMessages = {};
            }
          },
      });
    }
  }

  eliminarCliente(clienteId: number) {
    this.authService.EliminarCliente(clienteId).subscribe({
      next: () => {
        this.mostrarToast('Cliente eliminado exitosamente.');
        this.listarClientes();
      },
      error: () => {
        this.mostrarToast('Error al eliminar el cliente.');
      },
    });
  }

  // Optional: Clear error messages when the user starts typing
  validarCampo(campo: string) {
    if (this.errorMessages[campo]) {
        delete this.errorMessages[campo]; // Remove the error message for the specific field
    }
  }
  cancelarEdicion() {
    this.clienteActual = {};
    this.editandoCliente = null;
    this.errorMessages = {};
  }

  validarFormulario(): boolean {
    this.errorMessages = {};

    if (!this.clienteActual.ci) {
      this.errorMessages['ci'] = 'El CI es obligatorio.';
    }
    if (!this.clienteActual.nombres) {
      this.errorMessages['nombres'] = 'El nombre es obligatorio.';
    }
    if (!this.clienteActual.apellidos) {
      this.errorMessages['apellidos'] = 'Los apellidos son obligatorios.';
    }
    if (!this.clienteActual.telefono) {
      this.errorMessages['telefono'] = 'El teléfono es obligatorio.';
    }
    if (!this.clienteActual.direccion) {
      this.errorMessages['direccion'] = 'La dirección es obligatoria.';
    }

    return Object.keys(this.errorMessages).length === 0;
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  /**
   * Valida y limpia el campo para que solo acepte letras y espacios.
   * @param event Evento de entrada
   * @param campo Nombre del campo a validar ('nombres' o 'apellidos')
   */
  validarSoloLetras(event: any, campo: string) {
    const inputValue: string = event.target.value || '';
    const soloLetras = inputValue.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''); // Permite solo letras y espacios
    if (campo === 'nombres') {
      this.clienteActual.nombres = soloLetras;
    } else if (campo === 'apellidos') {
      this.clienteActual.apellidos = soloLetras;
    }
  }
}
