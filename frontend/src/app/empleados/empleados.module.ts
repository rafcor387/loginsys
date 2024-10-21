import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadosPageRoutingModule } from './empleados-routing.module';

import { EmpleadosPage } from './empleados.page';
import { UpdateEmpleadoComponent } from './update-empleado/update-empleado.component';
import { RegisterEmpleadoComponent } from './register-empleado/register-empleado.component';
import { ShowUserComponent } from './show-user/show-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadosPageRoutingModule
  ],
  declarations: [EmpleadosPage, UpdateEmpleadoComponent, RegisterEmpleadoComponent, ShowUserComponent]
})
export class EmpleadosPageModule {}
