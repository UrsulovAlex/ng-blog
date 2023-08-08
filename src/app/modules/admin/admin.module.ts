import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminMenuStoreModule } from './store/admin-menu-store/admin-menu-store.module';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AdminMenuStoreModule,
  ],
})
export class AdminModule { }
