import {useDispatch} from "react-redux";
import {useMemo} from "react";
import {bindActionCreators} from "@reduxjs/toolkit";
import {bookActions} from "@/store/books/books.slice.ts";

const rootActions = {
    ...bookActions
}
export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() =>
        bindActionCreators(rootActions, dispatch), [dispatch])
}