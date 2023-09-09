import {createSlice} from "@reduxjs/toolkit";
import {IBook} from "@/types/IInfoBooks.ts";


interface BooksState {
    totalCount: number
    books: IBook[]
}

const initialState: BooksState = {
    totalCount: 0,
    books: []
}
export const BooksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        updateTotalCount: (state, {payload: count}) => {
            state.totalCount = count
        },
        getBooksItems: (state, {payload: booksItems}) => {
            state.books = []
            state.books = booksItems
        },
        updateBooksItems: (state, {payload: booksItems}) => {
            state.books.push(...state.books, ...booksItems)
        },
    }
})

export const {reducer: bookReducer, actions: bookActions} = BooksSlice