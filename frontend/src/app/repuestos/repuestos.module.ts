import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepuestosPageRoutingModule } from './repuestos-routing.module';

import { RepuestosPage } from './repuestos.page';
import { RegisterRepuestoComponent } from './register-repuesto/register-repuesto.component';
import { UpdateRepuestoComponent } from './update-repuesto/update-repuesto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepuestosPageRoutingModule
  ],
  declarations: [RepuestosPage, RegisterRepuestoComponent, UpdateRepuestoComponent]
})
export class RepuestosPageModule {}
