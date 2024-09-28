import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationSuccessPage } from './verification-success.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationSuccessPageRoutingModule {}
