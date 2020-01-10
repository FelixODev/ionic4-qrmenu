import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'admin/restaurant',
    loadChildren: () => import('./pages/admin/restaurant/restaurant.module').then( m => m.RestaurantPageModule)
  },
  {
    path: 'admin/create-qr',
    loadChildren: () => import('./pages/admin/create-qr/create-qr.module').then( m => m.CreateQRPageModule)
  },
  {
    path: 'menu:id',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
