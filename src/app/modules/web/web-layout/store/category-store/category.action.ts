import { createAction, props } from "@ngrx/store";
import { ICategory } from "../../../../../shared/models_config_interface/category.interface";
import { CategoryActionType } from "./config";

export const initCategory = createAction(
    CategoryActionType.init
);

export const initCategorySuccess = createAction(
    CategoryActionType.success,
    props<{data: ICategory[]}>()
)

export const initCategoryFailed = createAction(
    CategoryActionType.failed,
    props<{serverError: string}>()
)