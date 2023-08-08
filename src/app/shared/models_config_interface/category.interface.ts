export interface ICategory {
    id: number,
    title: string;
}

export interface ICategoryState {
    loading: boolean;
    loaded: boolean;
    serverError: string | null;
    data: ICategory[];
}