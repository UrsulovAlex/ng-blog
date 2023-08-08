import { IParams } from "@shared/models_config_interface/params.interface";
import { IPost, IPostResponse } from "@shared/models_config_interface/post.interface";

export interface IPostState {
    data: IPost[];
}

export interface IPostStateData {
    postStateData: IPostState[];
    currentParams: Partial<IParams>;
    paramsStateData: Partial<IParams>[];
    currentDataIndex: number;
    loading: boolean;
    loaded: boolean;
    error: string | null;
}