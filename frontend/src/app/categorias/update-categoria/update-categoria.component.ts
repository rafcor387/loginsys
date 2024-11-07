import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-categoria',
  templateUrl: './update-categoria.component.html',
  styleUrls: ['./update-categoria.component.scss'],
})
export class UpdateCategoriaComponent  implements OnInit {
  @Input() categoria: any; 
  errorMessage: string = ''; 

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  updateCategoria() {
    this.authService.actualizarCategoria(this.categoria.id, this.categoria).subscribe(
      (response) => {
        console.log('Categoria actualizado:', response);
        this.modalController.dismiss(response); // Cierra el modal y devuelve el json de exito
      },
      (error) => {
        console.error('Error al actualizar la marca:', error);
        this.errorMessage = error; // Mostrar el error en el template
      }
    );
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
