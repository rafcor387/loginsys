import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationSuccessPageRoutingModule } from './verification-success-routing.module';

import { VerificationSuccessPage } from './verification-success.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationSuccessPageRoutingModule
  ],
  declarations: [VerificationSuccessPage]
})
export class VerificationSuccessPageModule {}
