import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebRoutingModule } from './web-routing.module';
import { CategoryStoreModule } from './web-layout/store/category-store/category-store.module';
import { WebHomeComponent } from './web-home/web-home.component';


@NgModule({
  imports: [
    CommonModule,
    WebRoutingModule,
    CategoryStoreModule,
  ]
})
export class WebModule { }
