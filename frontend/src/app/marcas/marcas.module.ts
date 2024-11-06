import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcasPageRoutingModule } from './marcas-routing.module';

import { MarcasPage } from './marcas.page';
import { RegisterMarcaComponent } from './register-marca/register-marca.component';
import { UpdateMarcaComponent } from './update-marca/update-marca.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcasPageRoutingModule
  ],
  declarations: [MarcasPage,RegisterMarcaComponent,UpdateMarcaComponent]
})
export class MarcasPageModule {}
