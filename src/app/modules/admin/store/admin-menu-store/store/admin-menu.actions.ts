import { createAction, props } from "@ngrx/store";
import { INestedTreeNodes } from "@view-ui/admin-nav-block/models/nested-tree-node";

export const initMenu = createAction(
    '[Admin Menu] init'
);

export const initMenuSuccess = createAction(
    '[Admin Menu] init success',
    props<{data: INestedTreeNodes[]}>()
)

export const initMenuFailed = createAction(
    '[Admin Menu] init failed',
    props<{serverError: string}>()
)