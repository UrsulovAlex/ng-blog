export interface IParams {
    search: string | undefined;
    categoryId: string | undefined;
    page: number,
    per_page: number,
    total: number,
    last_page: number;
}