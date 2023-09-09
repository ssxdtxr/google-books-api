import {http} from "@/config/http.ts";
import {IInfoBooks} from "@/types/IInfoBooks.ts";

export const BooksService = {
    async getBooks(params: { q: string, orderBy: string, printType: string, maxResults: number, startIndex?: number }) {
        return await http.get<IInfoBooks>(`/volumes`, {params})
    }
}