import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateQRPageRoutingModule } from './create-qr-routing.module';

import { CreateQRPage } from './create-qr.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  imports: [
    NgxQRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CreateQRPageRoutingModule
  ],
  declarations: [CreateQRPage]
})
export class CreateQRPageModule {}
