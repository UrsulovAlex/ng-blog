import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@shared/guards/admin.guard';
import { NotFoundComponent } from '@shared/page/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@modules/web/web.module').then(m => m.WebModule),
  },
  {
    path: 'admin', 
    loadChildren: () => import('@modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard],
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
