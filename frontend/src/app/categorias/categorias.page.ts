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
    this.Message = '';
    this.errorMessage = '';
    this.authService.listarCategorias().subscribe(
      (response) => {
        this.categorias = response;
      },
      (error) => {
        console.error('Error al obtener las categorías:', error);
        this.errorMessage = error;
      }
    );
  }

  async openRegisterModal() {
    this.Message = '';
    this.errorMessage = '';
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
    this.Message = '';
    this.errorMessage = '';
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
    this.Message = '';
    this.errorMessage = '';
    this.alertController
      .create({
        header: 'Confirmar Eliminación',
        message: '¿Está seguro de que desea eliminar?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Eliminación cancelada');
            },
          },
          {
            text: 'Sí',
            handler: () => {
              this.authService.eliminarCategoria(categoriaId).subscribe(
                (response) => {
                  this.LoadCategorias();
                  this.Message = response.message;
                },
                (error) => {
                  console.error('Error al eliminar la categoria:', error);
                  this.errorMessage = error; // Manejar el error
                }
              );
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }
}
