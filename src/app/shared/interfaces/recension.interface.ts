import { Book } from "./book.interface";

export interface RecensionDetails{
    id:string,
    shortInfo: string,
    content:string,
    rating: number,
    creation_date: Date,
    modyfication_date: Date,
    book:Book,
    author:string
}