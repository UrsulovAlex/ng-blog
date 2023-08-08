import { createReducer, on } from "@ngrx/store";
import { INestedTreeNodes } from "@view-ui/admin-nav-block/models/nested-tree-node";
import { initMenu, initMenuFailed, initMenuSuccess } from "@modules/admin/store/admin-menu-store/store/admin-menu.actions";
import { logoutSuccess } from "@shared/modules/auth/admin-auth-store/store/admin-auth.actions";

export const ADMIN_MENU_FEATURE_NAME = 'admin-menu';

export interface AdminMenuState {
    loading: boolean;
    loaded: boolean;
    serverError: string | null;
    data: INestedTreeNodes[];
}

const initialState: AdminMenuState = {
    loaded: false,
    loading: false,
    serverError: '',
    data: []
};

export const adminMenuReducer = createReducer(
    initialState,
    on(initMenu, state => state.loaded ? state : {
        ...state,
        loading: true,
    }),
    on(initMenuSuccess, (state, action) => ({
        ...state,
        loaded: true,
        loading: false,
        serverError: null,
        data: action.data,
    })),
    on(initMenuFailed, (state, action) => ({
        ...state,
        loaded: false,
        loading: false,
        serverError: action.serverError,
        data: [],
    })),
    on(logoutSuccess, () => initialState),
)