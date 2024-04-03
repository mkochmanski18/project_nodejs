import { Author } from "./author.interface";

export interface Book{
    id:string,
    title:string,
    description?:string,
    authorId:number,
    authorName?:string,
    genreId:number,
    genreName?: string,
    picturePath?:string
}