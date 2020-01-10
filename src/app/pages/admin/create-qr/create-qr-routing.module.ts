import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateQRPage } from './create-qr.page';

const routes: Routes = [
  {
    path: '',
    component: CreateQRPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateQRPageRoutingModule {}
