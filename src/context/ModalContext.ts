import {createContext, ReactNode} from "react";

interface IModalContext {
    isOpen: boolean;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    content: ReactNode | null
}

export const ModalContext = createContext<IModalContext>({
    isOpen: false,
    openModal: () => {
    },
    closeModal: () => {
    },
    content: null
});