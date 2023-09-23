import { ICategory } from "@shared/models_config_interface/category.interface";
import { IPost } from "@shared/models_config_interface/post.interface";


export interface ISelectData<T> {
    [key: string]: T;
}

export type SelectType = ICategory | IPost;

export enum CURRENT_TYPE_ENUM {
    Default,
    ICategory,
    IPost,
}


export function checkTypeOfdata(info: SelectType): CURRENT_TYPE_ENUM {
    if(isCategory(info as ICategory)) return CURRENT_TYPE_ENUM.ICategory;
    if(isPost(info as IPost)) return CURRENT_TYPE_ENUM.IPost;
    return CURRENT_TYPE_ENUM.Default;
}


function isCategory(item: ICategory): boolean {
    return (item as ICategory).title !== undefined && Object.keys(item).length === 2;
}

function isPost(item: IPost): boolean {
    return (item as IPost).nameCategory !== undefined;
}