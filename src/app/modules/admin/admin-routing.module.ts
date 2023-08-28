import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { PostResolver } from './admin-post/resolver/post.resolver';

const routes: Routes = [
  { 
    path: '',
    component: AdminLayoutComponent,
    children:[ 
      {
        path:'',
        component: AdminDashboardComponent,
        title: 'dashboard',
      },
      {
        path:'post/update/:id',
        loadComponent: () => import('@modules/admin/admin-post/admin-post.component').then(c => c.AdminPostComponent),
        resolve: {dataPost: PostResolver},
        data: {type: 'update'},
        title: 'update',
      },
      {
        path:'post/create',
        loadComponent: () => import('@modules/admin/admin-post/admin-post.component').then(c => c.AdminPostComponent),
        data: {type: 'create'},
        title: 'create',
      },
    ], 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
