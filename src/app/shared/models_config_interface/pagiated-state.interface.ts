import { IPagination } from "./pagination.interface";

export interface IPageContent<T> {
    items: T[];
}

export interface IPaginatedItemsState<T> {
    paginationDetails: IPagination
    pageContent: IPageContent<T>;
}