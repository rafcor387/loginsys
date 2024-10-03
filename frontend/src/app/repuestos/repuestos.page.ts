import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UpdateRepuestoModalComponent } from '../components/update-repuesto-modal/update-repuesto-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  repuestos: any[] = []; // Array para almacenar los repuestos
  nuevoRepuesto = {
    nombre: '',
    descripcion: '',
    cantidad_stock: 0,
    fabricante: '',
    categoria: '',
    costo_unitario: 0,
    precio_venta: 0,
  };
  errorMessage: string = ''; // Variable para almacenar el mensaje de error

  constructor(
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.listarRepuestos(); // Llamar al método al inicializar la página
  }

  agregarRepuesto() {
    this.authService.repuestos(this.nuevoRepuesto)
      .subscribe(
        (response) => {
          this.repuestos.push(response); // Agregar el nuevo repuesto a la lista
          this.nuevoRepuesto = {  // Reiniciar el formulario
            nombre: '',
            descripcion: '',
            cantidad_stock: 0,
            fabricante: '',
            categoria: '',
            costo_unitario: 0,
            precio_venta: 0,
          };
          this.errorMessage = ''; // Limpiar cualquier mensaje de error anterior
        },
        (error) => {
          console.error('Error al agregar el repuesto:', error);
          this.errorMessage = error;  // Almacenar el mensaje de error
        }
      );
  }

  listarRepuestos() {
    this.authService.repuestosListar()
      .subscribe(
        (response) => {
          this.repuestos = response; // Guardar los datos en el array
          this.errorMessage = ''; // Limpiar cualquier error
        },
        (error) => {
          console.error('Error al obtener los repuestos:', error);
          this.errorMessage = error; // Almacenar el mensaje de error
        }
      );
  }

  eliminarRepuesto(repuestoId: number) {
    this.authService.eliminarRepuesto(repuestoId)
      .subscribe(
        (response) => {
          console.log('Repuesto eliminado:', response);
          this.listarRepuestos(); // Volver a listar repuestos después de eliminar uno
        },
        (error) => {
          console.error('Error al eliminar el repuesto:', error);
          this.errorMessage = error; // Almacenar el mensaje de error
        }
      );
  }
  

  async openUpdateModal(repuesto: any) {
    const modal = await this.modalController.create({
      component: UpdateRepuestoModalComponent,
      componentProps: { repuesto: { ...repuesto } }, // Pass a copy of the repuesto
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Update the repuestos array with the updated repuesto
        const index = this.repuestos.findIndex((r) => r.id === data.data.id);
        if (index !== -1) {
          this.repuestos[index] = data.data;
        }
      }
    });
    return await modal.present();
  }
}
