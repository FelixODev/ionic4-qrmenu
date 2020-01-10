import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { RestaurantComponent } from 'src/app/components/view/restaurant/restaurant.component';

@NgModule({
  entryComponents: [
    RestaurantComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule
  ],
  declarations: [AdminPage, RestaurantComponent]
})
export class AdminPageModule {}
