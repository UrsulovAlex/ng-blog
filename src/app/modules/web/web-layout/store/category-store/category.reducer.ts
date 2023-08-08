import { createReducer, on } from '@ngrx/store';
import { ICategoryState } from '../../../../../shared/models_config_interface/category.interface';
import { initCategory, initCategoryFailed, initCategorySuccess } from './category.action';


const initialState: ICategoryState = {
    loaded: false,
    loading: false,
    serverError: '',
    data: []
};


export const CategoryReducer = createReducer<ICategoryState>(
    initialState,
    on(initCategory, state => state.loaded ? state : {
        ...state,
        loading: true,
    }),
    on(initCategorySuccess, (state, action) => ({
        ...state,
        loaded: true,
        loading: false,
        serverError: null,
        data: action.data,
    })),
    on(initCategoryFailed, (state, action) => ({
        ...state,
        loaded: true,
        loading: false,
        serverError: action.serverError,
        data: [],
    }))
);