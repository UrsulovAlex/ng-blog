import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { 
    path: '',
    component: AdminLayoutComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },   
      {
        path:'dashboard',
        component: AdminDashboardComponent,
      },
      {
        path:'form/:namespace/:entity',
        loadComponent: () => import('./admin-form/admin-form.component').then(c => c.AdminFormComponent),
      },
      {
        path:'grid/:namespace/:entity',
        loadComponent: () => import('./admin-grid/admin-grid.component').then(c => c.AdminGridComponent),
      },   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
