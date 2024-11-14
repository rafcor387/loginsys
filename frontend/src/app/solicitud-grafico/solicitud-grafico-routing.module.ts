import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudGraficoPage } from './solicitud-grafico.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitudGraficoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudGraficoPageRoutingModule {}
