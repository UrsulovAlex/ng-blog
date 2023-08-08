import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CATEGORY_LIST } from "./config";
import { ICategoryState } from "../../../../../shared/models_config_interface/category.interface";

const getFeature = createFeatureSelector<ICategoryState>(CATEGORY_LIST);

export const getLoading = createSelector(
    getFeature,
    state => state.loading
);
  
export const getLoaded = createSelector(
    getFeature,
    state => state.loaded
);

export const getServerError = createSelector(
    getFeature,
    state => state.serverError
);

export const getCategoryData = createSelector(
    getFeature,
    state => state.data
);