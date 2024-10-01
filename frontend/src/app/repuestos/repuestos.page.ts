import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  repuestos: any[] = []; // Array para almacenar los repuestos
  apiUrl: string = 'http://project.test/backend/public/api/repuestos'; // URL de la API

  constructor() {}

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
  nuevoRepuesto = {
    nombre: '',
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
