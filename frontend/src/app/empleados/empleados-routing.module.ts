
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadosPage } from './empleados.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadosPage
  },
  /*
  {
    path: 'update-empleado',
    loadChildren: () => import('./update-empleado/update-empleado.module').then( m => m.UpdateEmpleadoPageModule)
  }*/

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadosPageRoutingModule {}
