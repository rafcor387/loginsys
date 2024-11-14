import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesPredictionPage } from './sales-prediction.page';

const routes: Routes = [
  {
    path: '',
    component: SalesPredictionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesPredictionPageRoutingModule {}
