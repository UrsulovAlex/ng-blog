import { IPostResponse } from '@shared/models_config_interface/post.interface';
import { ServiceLayoutService } from '../../../../modules/web/web-layout/store/services/service-layout.service';
import { Injectable, inject } from '@angular/core';
import { EMPTY, Observable, of, switchMap, tap } from 'rxjs';
import { IPostState, IPostStateData } from './models/post-state';
import { ComponentStore, OnStoreInit, tapResponse } from '@ngrx/component-store';
import { IParams } from '@shared/models_config_interface/params.interface';
import { simpleCompareObject } from '@shared/helpers/simpleCompareObject';


const initialState: IPostStateData = {
    postStateData: [],
    currentParams: {
        search: '',
        categoryId: '',
        page: 0,
        per_page: 0,
        total: 0,
        last_page: 0,
    },
    loading: false,
    currentDataIndex: 0,
    paramsStateData: [],
    loaded: false,
    error: null,
};

@Injectable()
export class PostComponentStore extends ComponentStore<IPostStateData> implements OnStoreInit{
    private readonly serviceLayoutService = inject(ServiceLayoutService);
    postState$ = this.select(state => state);
    constructor() {
        super(initialState);
    }

    ngrxOnStoreInit() {
        this.initDefaultState();
    }

    private readonly initDefaultState = this.updater((state: IPostStateData) => ({
        ...state,
        currentDataIndex: 0,
        loading: true, 
        loaded: false, 
        error: null,
    }));

    private readonly updateGlobalParams = this.updater((state: IPostStateData, params: Partial<IParams>) => ({
        ...state,
        currentParams: {
            ...state.currentParams,
            ...params,
        },
        paramsStateData: [...state.paramsStateData, params],
        currentDataIndex: 1,
        loading: true,
        loaded: false, 
    }));

    private readonly updateGlobalState = this.updater((state: IPostStateData, updateState: IPostState) => ({
        ...state,
        postStateData:[...state.postStateData, updateState],
        currentParams: {
            ...state.currentParams,
        },
        paramsStateData: [...state.paramsStateData],
        currentDataIndex: state.postStateData.length,
        loading: false,
        loaded: true, 
    }));

    getPosts$ = this.effect((params$: Observable<Partial<IParams>>) => params$.pipe(
        switchMap((payload) => {
            const dataState = this.get(state => state.postStateData);
            if (!dataState.length) {             
                return this.serviceLayoutService.getAllPosts(payload).pipe(
                    tapResponse((data: IPostResponse) => {
                        const loadingPostStateData: IPostState[] = [{
                            data: [...data.data],
                        }];
                        const currentParams = {
                            search: payload.search,
                            categoryId: payload.categoryId,
                            page: data.page,
                            per_page: data.per_page,
                            total: data.total,
                            last_page: data.last_page,
                        }
                        this.setState({
                            postStateData: [...loadingPostStateData],
                            currentParams: {
                                search: payload.search,
                                categoryId: payload.categoryId,
                                page: data.page,
                                per_page: data.per_page,
                                total: data.total,
                                last_page: data.last_page,
                            },
                            currentDataIndex: 0,
                            paramsStateData: [currentParams],
                            loading: false, 
                            loaded: true, 
                            error: null,
                        });
                    },
                    () => this.patchState({ error: "State Something went wrong"})),
                )
            }
            return EMPTY;
        })
    ))

    updatePageWithQueeryParams$ = this.effect((params$: Observable<Partial<IParams>>) => params$.pipe(
        switchMap((payload) => {
            const dataState = this.get(state => state);

            return this.serviceLayoutService.getAllPosts(payload).pipe(
                tapResponse((data: IPostResponse) => {
                    const updatePostStateData: IPostState = {
                        data: data.data,
                    };
                    this.updateGlobalState(updatePostStateData)

                },
                () => this.patchState({ error: "updatePageWithQueeryParams Something went wrong"})),
            )
        }),
    ));

    checkGlobalParams(params: Partial<IParams>) {
        const getParamState = this.get(state => state.currentParams);
        const pageParams = this.get(state => state);
        const currentParams = {
            ...getParamState,
            ...params,
        }
        const pageIndex = this.checkPageIndex(pageParams.paramsStateData, currentParams);

        if (pageIndex < 0) {
            this.updateGlobalParams(currentParams);
            this.updatePageWithQueeryParams$(currentParams);
        } else {
            this.patchState({currentDataIndex: pageIndex});
        }
    }

    checkPageIndex(params: Partial<IParams>[], currentParams: Partial<IParams>): number {
        return params.findIndex((params) => simpleCompareObject(params, currentParams));
    }
};