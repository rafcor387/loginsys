import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-repuesto',
  templateUrl: './update-repuesto.component.html',
  styleUrls: ['./update-repuesto.component.scss'],
})
export class UpdateRepuestoComponent  implements OnInit {
  @Input() repuesto: any; // Input property to receive the repuesto data
  errorMessage: string = ''; // Para mostrar errores en el template
  categorias: any[] = []; // Array para almacenar categorías
  marcas: any[] = []; // Array para almacenar marcas
  imagenSeleccionada: File | null = null;

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (!this.repuesto) {
      this.repuesto = {
        nombre: '',
        descripcion: '',
        cantidad_stock: 0,
        fabricante: '',
        id_categoria: '', 
        id_marca: '',
        costo_unitario: 0,
        precio_unitario: 0,
        imagen: null,
      };
    }
    this.LoadCategorias(); 
    this.LoadMarcas(); 
  }

  updateRepuesto() {
    this.authService.actualizarRepuesto(this.repuesto.id, this.repuesto).subscribe(
      (response) => {
        console.log('Repuesto actualizado:', response);
        this.modalController.dismiss(response); // Cierra el modal y devuelve el json de exito
      },
      (error) => {
        console.error('Error al actualizar el repuesto:', error);
        this.errorMessage = error; // Mostrar el error en el template
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

  /*
  updateRepuesto() {
    const formData = new FormData();
    formData.append('nombre', this.repuesto.nombre);
    formData.append('descripcion', this.repuesto.descripcion);
    formData.append('cantidad_stock', this.repuesto.cantidad_stock.toString());
    formData.append('costo_unitario', this.repuesto.costo_unitario.toString());
    formData.append('precio_unitario', this.repuesto.precio_unitario.toString());
    formData.append('id_marca', this.repuesto.id_marca.toString());
    formData.append('id_categoria', this.repuesto.id_categoria.toString());

    // Si hay una nueva imagen seleccionada, la añadimos al FormData
    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    // Llamar al servicio para actualizar el repuesto
    this.authService.actualizarRepuesto(this.repuesto.id, formData).subscribe(
      (response) => {
        console.log('Repuesto actualizado:', response);
        this.modalController.dismiss(response); // Cierra el modal y devuelve la respuesta
      },
      (error) => {
        console.error('Error al actualizar el repuesto:', error);
      }
    );
  }
    */



  closeModal() {
    this.modalController.dismiss();
  }

}
