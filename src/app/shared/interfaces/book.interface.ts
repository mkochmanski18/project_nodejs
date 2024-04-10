export interface Book{
    id:number,
    title?:string,
    description?:string,
    authorId?:number,
    authorName?:string,
    genreId?:number,
    genreName?: string,
    picturePath?:string
}

export interface BookList{
    items:Book[],
    page:number,
    pageSize:number,
    totalCount:number,
    hasNextPage:boolean,
    hasPreviousPage:boolean,
}