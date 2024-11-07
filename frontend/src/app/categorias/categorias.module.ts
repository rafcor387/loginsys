import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriasPageRoutingModule } from './categorias-routing.module';

import { CategoriasPage } from './categorias.page';
import { RegisterCategoriaComponent } from './register-categoria/register-categoria.component';
import { UpdateCategoriaComponent } from './update-categoria/update-categoria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasPageRoutingModule
  ],
  declarations: [CategoriasPage,RegisterCategoriaComponent,UpdateCategoriaComponent]
})
export class CategoriasPageModule {}
