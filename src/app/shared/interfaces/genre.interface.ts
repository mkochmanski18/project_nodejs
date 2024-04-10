export interface Genre{
    id:number,
    name:string,
}

export interface GenreList{
    items:Genre[],
    page:number,
    pageSize:number,
    totalCount:number,
    hasNextPage:boolean,
    hasPreviousPage:boolean,
}