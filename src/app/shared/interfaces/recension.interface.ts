export interface RecensionDetails{
    id:number,
    title?:string,
    preview?:string,
    isPositive?:boolean,
    plusCount?:string,
    isPlussed?:boolean,
    userName?:string,
}
export interface RecensionList{
    items: RecensionDetails[],
    page:number,
    pageSize:number,
    totalCount:number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}