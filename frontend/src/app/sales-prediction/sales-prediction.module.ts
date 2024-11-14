import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalesPredictionPageRoutingModule } from './sales-prediction-routing.module';

import { SalesPredictionPage } from './sales-prediction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalesPredictionPageRoutingModule
  ],
  declarations: [SalesPredictionPage]
})
export class SalesPredictionPageModule {}
