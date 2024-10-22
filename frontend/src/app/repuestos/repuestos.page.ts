import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UpdateRepuestoModalComponent } from '../components/update-repuesto-modal/update-repuesto-modal.component';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.page.html',
  styleUrls: ['./repuestos.page.scss'],
})
export class RepuestosPage implements OnInit {
  repuestos: any[] = [];
  nuevoRepuesto = {
    nombre: '',
    descripcion: '',
    cantidad_stock: 0,
    fabricante: '',
    categoria: '', // Cambia null a un string vacío
    marca: '', // Cambia null a un string vacío
    costo_unitario: 0,
    precio_unitario: 0,
    imagen: null,
  };
  errorMessage: string = '';
  imagenSeleccionada: File | null = null;
  categorias: any[] = []; // Array para almacenar categorías
  marcas: any[] = []; // Array para almacenar marcas

  constructor(
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.listarRepuestos();
    this.listarCategorias(); // Llamar al método para obtener categorías
    this.listarMarcas(); // Llamar al método para obtener marcas
  }

  listarRepuestos() {
    this.authService.repuestosListar().subscribe(
      (response) => {
        this.repuestos = response;
        console.log('Repuestos:', this.repuestos); // Agrega este log
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener los repuestos:', error);
        this.errorMessage = error;
      }
    );
  }

  listarCategorias() {
    this.authService.listarCategorias().subscribe(
      (response) => {
        this.categorias = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener categorías:', error);
        this.errorMessage = error;
      }
    );
  }

  listarMarcas() {
    this.authService.listarMarcas().subscribe(
      (response) => {
        this.marcas = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
        this.errorMessage = error;
      }
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file; // Asigna el archivo a imagenSeleccionada
    }
  }

  agregarRepuesto() {
    console.log('Datos del nuevo repuesto:', this.nuevoRepuesto); // Depuración

    const formData = new FormData();

    // Agrega los datos del nuevo repuesto
    formData.append('nombre', this.nuevoRepuesto.nombre);
    formData.append('descripcion', this.nuevoRepuesto.descripcion);
    formData.append('cantidad_stock', this.nuevoRepuesto.cantidad_stock.toString());
    formData.append('fabricante', this.nuevoRepuesto.fabricante);
    formData.append('id_marca', this.nuevoRepuesto.marca.toString());
    formData.append('id_categoria', this.nuevoRepuesto.categoria.toString());
    formData.append('costo_unitario', this.nuevoRepuesto.costo_unitario.toString());
    formData.append('precio_unitario', this.nuevoRepuesto.precio_unitario.toString());

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada); // Agrega la imagen al FormData
    }

    // Llama al servicio para agregar el repuesto
    this.authService.Agregarepuestos(formData).subscribe(
      (response) => {
        this.repuestos.push(response); // Agrega el nuevo repuesto a la lista
        this.resetNuevoRepuesto(); // Restablecer nuevo repuesto después de agregar
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al agregar el repuesto:', error);
        this.errorMessage = error; // Manejo de errores
      }
    );
  }

  resetNuevoRepuesto() {
    this.nuevoRepuesto = {
      nombre: '',
      descripcion: '',
      cantidad_stock: 0,
      fabricante: '',
      categoria: '', // Cambia null a un string vacío
      marca: '', // Cambia null a un string vacío
      costo_unitario: 0,
      precio_unitario: 0,
      imagen: null,
    };
    this.imagenSeleccionada = null; // Resetear la imagen seleccionada
  }

  eliminarRepuesto(repuestoId: number) {
    this.authService.eliminarRepuesto(repuestoId).subscribe(
      (response) => {
        console.log('Repuesto eliminado:', response);
        this.listarRepuestos(); // Vuelve a listar los repuestos
      },
      (error) => {
        console.error('Error al eliminar el repuesto:', error);
        this.errorMessage = error; // Manejo de errores
      }
    );
  }

  async openUpdateModal(repuesto: any) {
    const modal = await this.modalController.create({
      component: UpdateRepuestoModalComponent,
      componentProps: { repuesto: { ...repuesto } },
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        const index = this.repuestos.findIndex((r) => r.id === data.data.id);
        if (index !== -1) {
          this.repuestos[index] = data.data; // Actualiza el repuesto en la lista
        }
      }
    });
    return await modal.present();
  }
}
