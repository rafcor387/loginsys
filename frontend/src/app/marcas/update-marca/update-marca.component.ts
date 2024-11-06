import { Component,Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-marca',
  templateUrl: './update-marca.component.html',
  styleUrls: ['./update-marca.component.scss'],
})
export class UpdateMarcaComponent  implements OnInit {
  @Input() marca: any; 
  errorMessage: string = ''; 

  constructor(
    private modalController: ModalController,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  updateMarca() {
    this.authService.actualizarMarca(this.marca.id, this.marca).subscribe(
      (response) => {
        console.log('Marca actualizado:', response);
        this.modalController.dismiss(response); // Cierra el modal y devuelve el json de exito
        //window.location.reload();
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
