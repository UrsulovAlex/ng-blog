export const PAGINATOR_PAGE_SIZE_OPTIONS: number[] = [2, 4, 6];

export interface IPagination {
    page: number,
    per_page: number,
    total: number,
    last_page: number;
}