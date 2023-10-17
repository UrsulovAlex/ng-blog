import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebLayoutComponent } from './web-layout/web-layout.component';
import { WebHomeComponent } from './web-home/web-home.component';
import { PostComponent } from './post/post.component';
import { PostResolver } from './post/resolver/post.resolver';

const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./admin-auth/admin-auth.component').then(c => c.AdminAuthComponent),
        data: { showHeader: false, showSidebar: false, register: false },
      },
      {
        path: 'register',
        loadComponent: () => import('./admin-auth/admin-auth.component').then(c => c.AdminAuthComponent),
        data: { showHeader: false, showSidebar: false, register: true },
      },
      {
        path: 'home',
        component: WebHomeComponent,
      },
      {
        path: 'post/:id',
        component: PostComponent,
        resolve: {
          data: PostResolver,
        }
      },
      {path: '', redirectTo: 'home', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
