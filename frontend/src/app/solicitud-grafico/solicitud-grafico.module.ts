import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitudGraficoPageRoutingModule } from './solicitud-grafico-routing.module';

import { SolicitudGraficoPage } from './solicitud-grafico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitudGraficoPageRoutingModule
  ],
  declarations: [SolicitudGraficoPage]
})
export class SolicitudGraficoPageModule {}
