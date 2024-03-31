import { Author } from "./author.interface";

export interface Book{
    id:string,
    title:string,
    author:Author,
    release_date: Date,
    species: string,
}