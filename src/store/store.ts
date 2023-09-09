import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {bookReducer} from "@/store/books/books.slice.ts";

const reducers = combineReducers({
    books: bookReducer
})

export const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch