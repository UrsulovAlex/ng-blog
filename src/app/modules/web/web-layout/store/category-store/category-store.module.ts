import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { CATEGORY_LIST } from './config';
import { CategoryReducer } from './category.reducer'
import { CategoryEffect } from './category.effect';
import { initCategory } from './category.action';


@NgModule({
    imports: [
        StoreModule.forFeature(CATEGORY_LIST, CategoryReducer),
        EffectsModule.forFeature([CategoryEffect])
    ]
})
export class CategoryStoreModule {
     constructor (private store$: Store){
        this.store$.dispatch(initCategory());
     };
}