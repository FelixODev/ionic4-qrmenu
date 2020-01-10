import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartButtonComponent } from './cart-button/cart-button.component';
import { CartComponent } from './popover/cart.component';



@NgModule({
  declarations: [
    CartButtonComponent,
    CartComponent,
  ],
  entryComponents: [
    CartButtonComponent,
    CartComponent,
  ],
  exports:[
    CartButtonComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  providers:[
  ]
})
export class CartModule { }
