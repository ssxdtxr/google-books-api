import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";
import {SnackbarProvider} from "notistack";
import ModalContextProvider from "@/context/ModalContext.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ModalContextProvider>
            <QueryClientProvider client={queryClient}>
                <SnackbarProvider anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>
                    <App/>
                </SnackbarProvider>
            </QueryClientProvider>
        </ModalContextProvider>
    </Provider>
)
