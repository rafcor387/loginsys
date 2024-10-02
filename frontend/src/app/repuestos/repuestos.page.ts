import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ModalController } from '@ionic/angular';
import { UpdateRepuestoModalComponent } from '../components/update-repuesto-modal/update-repuesto-modal.component';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  repuestos: any[] = []; // Array para almacenar los repuestos
  apiUrl: string = 'http://project.test/backend/public/api/repuestos'; // URL de la API

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.listarRepuestos(); // Llamar al método al inicializar la página
  }

  listarRepuestos() {
    axios
      .get(this.apiUrl)
      .then((response) => {
        this.repuestos = response.data; // Guardar los datos en el array
      })
      .catch((error) => {
        console.error('Error al obtener los repuestos:', error);
      });
  }

  async openUpdateModal(repuesto: any) {
    const modal = await this.modalController.create({
      component: UpdateRepuestoModalComponent,
      componentProps: { repuesto: { ...repuesto } }, // Pass a copy of the repuesto
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        // Update the repuestos array with the updated repuesto
        const index = this.repuestos.findIndex(r => r.id === data.data.id);
        if (index !== -1) {
          this.repuestos[index] = data.data;
        }
      }
    });

    return await modal.present();
  }

  nuevoRepuesto = {
    nombre:'',
    descripcion: '',
    cantidad_stock: 0,
    fabricante: '',
    categoria: '',
    costo_unitario: 0,
    precio_venta: 0,
  };

  agregarRepuesto() {
    axios
      .post(this.apiUrl, this.nuevoRepuesto)
      .then((response) => {
        this.repuestos.push(response.data); // Agregar el nuevo repuesto a la lista
        this.nuevoRepuesto = {
          // Reiniciar el formulario
          nombre: '',
          descripcion: '',
          cantidad_stock: 0,
          fabricante: '',
          categoria: '',
          costo_unitario: 0,
          precio_venta: 0,
        };
      })
      .catch((error) => {
        console.error('Error al agregar el repuesto:', error);
      });
  }
  eliminarRepuesto(repuestoId: number) {
    axios
      .delete(`http://project.test/backend/public/api/repuestos/${repuestoId}`)
      .then((response) => {
        console.log('Repuesto eliminado:', response.data);
        this.listarRepuestos();
      })
      .catch((error) => {
        console.error('Error al eliminar el repuesto:', error);
      });
  }
}
