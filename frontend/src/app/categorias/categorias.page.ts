import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: any[] = []; // Lista de categorías
  categoriaForm = {
    id: null,
    nombre: '',
    descripcion: '',
  }; // Formulario compartido para agregar o actualizar categoría
  errorMessage: string = ''; // Mensaje de error
  isEditMode: boolean = false; // Indica si estamos en modo de edición

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.LoadCategorias(); // Cargar categorías al iniciar
  }

  // Cargar todas las categorías
  LoadCategorias() {
    this.authService.listarCategorias().subscribe(
      (response) => {
        this.categorias = response;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
        this.errorMessage = error;
      }
    );
  }

  // Agregar una nueva categoría
  AddCategoria() {
    this.authService.AgregarCategoria(this.categoriaForm).subscribe(
      (response) => {
        this.categorias.push(response); // Agregar la nueva categoría a la lista
        this.resetForm(); // Limpiar el formulario
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error al agregar la categoría:', error);
        this.errorMessage = error;
      }
    );
  }

  // Eliminar una categoría
  DeleteCategoria(categoriaId: number) {
    this.authService.eliminarCategoria(categoriaId).subscribe(
      (response) => {
        console.log('Categoría eliminada:', response);
        this.LoadCategorias(); // Recargar la lista de categorías
      },
      (error) => {
        console.error('Error al eliminar la categoría:', error);
        this.errorMessage = error;
      }
    );
  }

  // Seleccionar una categoría para editar (reutilizando el mismo formulario)
  selectCategoria(categoria: any) {
    this.categoriaForm = { ...categoria }; // Copiar los datos de la categoría seleccionada al formulario
    this.isEditMode = true; // Activar modo de edición
  }

  // Actualizar la categoría seleccionada
  UpdateCategoria() {
    if (this.categoriaForm.id) {
      this.authService.actualizarCategoria(this.categoriaForm.id, this.categoriaForm).subscribe(
        (response) => {
          console.log('Categoría actualizada:', response);
          this.LoadCategorias(); // Recargar la lista de categorías
          this.resetForm(); // Limpiar el formulario
          this.errorMessage = '';
          this.isEditMode = false; // Desactivar modo de edición
        },
        (error) => {
          console.error('Error al actualizar la categoría:', error);
          this.errorMessage = error;
        }
      );
    }
  }

  // Cancelar la edición
  cancelEdit() {
    this.resetForm(); // Limpiar el formulario de edición
    this.isEditMode = false; // Desactivar modo de edición
  }

  // Limpiar el formulario de categoría
  resetForm() {
    this.categoriaForm = {
      id: null,
      nombre: '',
      descripcion: '',
    };
  }
}
