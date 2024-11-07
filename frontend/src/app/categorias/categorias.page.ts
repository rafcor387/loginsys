import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { RegisterCategoriaComponent } from './register-categoria/register-categoria.component';
import { UpdateCategoriaComponent } from './update-categoria/update-categoria.component';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
  categorias: any[] = []; // Lista de categorías
  errorMessage: string = '';
  Message: string = '';


  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
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

  async openRegisterModal() {
    const modal = await this.modalController.create({
      component: RegisterCategoriaComponent,
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadCategorias();
        this.Message = data.data.successMessage; 
      }
    });
    return await modal.present();
  }

  async openUpdateModal(categoria: any) {
    const modal = await this.modalController.create({
      component: UpdateCategoriaComponent,
      componentProps: { categoria: { ...categoria } },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.LoadCategorias();
        this.Message = data.data.message; 
      }
    });
    return await modal.present();
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
}
