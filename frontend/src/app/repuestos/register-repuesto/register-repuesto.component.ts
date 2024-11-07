import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-repuesto',
  templateUrl: './register-repuesto.component.html',
  styleUrls: ['./register-repuesto.component.scss'],
})
export class RegisterRepuestoComponent  implements OnInit {
  nuevoRepuesto = {
    nombre: '',
    descripcion: '',
    cantidad_stock: 0,
    fabricante: '',
    id_categoria: '', // Cambia null a un string vacío
    id_marca: '', // Cambia null a un string vacío
    costo_unitario: 0,
    precio_unitario: 0,
    imagen: null,
  };
  errorMessage: string = '';
  imagenSeleccionada: File | null = null;
  categorias: any[] = []; // Array para almacenar categorías
  marcas: any[] = []; // Array para almacenar marcas

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.LoadCategorias(); 
    this.LoadMarcas(); 
  }

  AddRepuesto() {
    const formData = new FormData();
    formData.append('nombre', this.nuevoRepuesto.nombre);
    formData.append('descripcion', this.nuevoRepuesto.descripcion);
    formData.append('cantidad_stock', this.nuevoRepuesto.cantidad_stock.toString());
    formData.append('fabricante', this.nuevoRepuesto.fabricante);
    formData.append('id_marca', this.nuevoRepuesto.id_marca.toString());
    formData.append('id_categoria', this.nuevoRepuesto.id_categoria.toString());
    formData.append('costo_unitario', this.nuevoRepuesto.costo_unitario.toString());
    formData.append('precio_unitario', this.nuevoRepuesto.precio_unitario.toString());
    // Si hay una imagen seleccionada, la agregamos al FormData
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada); // Agrega la imagen
    }
    // Llama al servicio para agregar el repuesto
    this.authService.AgregarRepuesto(formData).subscribe(
      (response) => {
        console.log('Repuesto agregado:', response.nuevoRepuesto);
        this.modalController.dismiss({
          successMessage: response.message, // Asumiendo que response.message contiene el mensaje de éxito
      
        });
      },
      (error) => {
        console.error('Error al agregar el repuesto:', error);
        this.errorMessage = error;
      }
    );
  }
  
  LoadCategorias() {
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

  LoadMarcas() {
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

  close() {
    this.modalController.dismiss();
  }
}
