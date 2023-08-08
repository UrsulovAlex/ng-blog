import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ServiceLayoutService } from "../services/service-layout.service";
import { initCategory, initCategoryFailed, initCategorySuccess } from "./category.action";
import { Store, select } from "@ngrx/store";
import { catchError, filter, map, of, switchMap, withLatestFrom } from "rxjs";
import { getLoaded, getLoading } from './category.selectors'

@Injectable()
export class CategoryEffect {
    initCategory$ = createEffect(() => this.actions$.pipe(
        ofType(initCategory),
        withLatestFrom(
            this.store$.pipe(select(getLoaded)),
            this.store$.pipe(select(getLoading))
        ),
        filter(([_, loaded, loading]) => !loaded && loading),
        switchMap(() => this.serviceLayoutService.getCategory().pipe(
            map(data => initCategorySuccess({data})),
            catchError(error => of(initCategoryFailed({serverError: error.serverError})))
        ))
    ))

    constructor(
        private actions$: Actions,
        private serviceLayoutService: ServiceLayoutService,
        private store$: Store
      ) { }
}
