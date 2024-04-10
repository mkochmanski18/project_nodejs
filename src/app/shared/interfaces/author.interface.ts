export interface Author{
    id:number,
    biography?:string,
    name:string,
    dateBirth?:Date,
    dateDeath?:Date,
    picturePath:string
}

export interface AuthorList{
    items:Author[],
    page:number,
    pageSize:number,
    totalCount:number,
    hasNextPage:boolean,
    hasPreviousPage:boolean,
}