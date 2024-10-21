import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.page.html',
  styleUrls: ['./marcas.page.scss'],
})
export class MarcasPage implements OnInit {
  marcas: any[] = []; // Lista de marcas
  marcaForm = {
    id: null,
    nombre: '',
    pais: '',
    email: '',
    direccion: '',
    telefono: '',
    sitio_web: '',
    descripcion: '',
  }; // Formulario compartido para agregar o actualizar marca
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoadMarcas(); // Cargar marcas al iniciar
  }

  // Cargar todas las marcas
  LoadMarcas() {
    this.authService.listarMarcas().subscribe(
      (response) => {
        this.marcas = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener las marcas:', error);
        this.errorMessage = error;
      }
    );
  }

  // Agregar una nueva marca
  AddMarca() {
    this.authService.AgregarMarca(this.marcaForm).subscribe(
      (response) => {
        this.marcas.push(response); // Agregar la nueva marca a la lista
        this.resetForm(); // Limpiar el formulario
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al agregar la marca:', error);
        this.errorMessage = error;
      }
    );
  }

  // Eliminar una marca
  DeleteMarca(marcaId: number) {
    this.authService.eliminarMarca(marcaId).subscribe(
      (response) => {
        console.log('Marca eliminada:', response);
        this.LoadMarcas(); // Recargar la lista de marcas
      },
      (error) => {
        console.error('Error al eliminar la marca:', error);
        this.errorMessage = error;
      }
    );
  }

  // Seleccionar una marca para editar (reutilizando el mismo formulario)
  selectMarca(marca: any) {
    this.marcaForm = { ...marca }; // Copiar los datos de la marca seleccionada al formulario
  }

  // Actualizar la marca seleccionada
  UpdateMarca() {
    if (this.marcaForm.id) {
      this.authService.actualizarMarca(this.marcaForm.id, this.marcaForm).subscribe(
        (response) => {
          console.log('Marca actualizada:', response);
          this.LoadMarcas(); // Recargar la lista de marcas
          this.resetForm(); // Limpiar el formulario
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error al actualizar la marca:', error);
          this.errorMessage = error;
        }
      );
    }
  }

  // Cancelar la edición
  cancelEdit() {
    this.resetForm(); // Limpiar el formulario de edición
  }

  // Limpiar el formulario de marca
  resetForm() {
    this.marcaForm = {
      id: null,
      nombre: '',
      pais: '',
      email: '',
      direccion: '',
      telefono: '',
      sitio_web: '',
      descripcion: '',
    };
  }
}
