import { ICategory } from "./category.interface";
import { IUser } from "./user.interface"

export interface IPost {
    id: number;
    author: Partial<IUser>;
    createdAt: string;
    nameCategory: ICategory;
    text: string;
    title: string;
    updatedAt: string,
}

export interface IPostResponse {
    data: IPost[],
    last_page: number,
    page: number,
    per_page: number,
    total: number,
}; 

export interface IPostSingle {
    author: Partial<IUser>;
    categoryId: number;
    createdAt: string;
    id: number;
    nameCategory: ICategory,
    postComments:  IPostComments[],
    text: string;
    title: string;
    updatedAt: string,
}

export interface IPostComments {
    createdAt: string;
    id: number;
    message: string;
    postId: number;
    updatedAt: string;
    userId: number;
}

export interface IManipulatePost {
    title: string;
    text: string;
    authorPostsId: IPostSingle['author']['id'];
    categoryId: IPostSingle['nameCategory']['id'];
}