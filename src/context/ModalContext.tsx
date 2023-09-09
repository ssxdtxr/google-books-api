import {useState, ReactNode, FC} from 'react';
import Modal from "../components/Modal/Modal";
import {ModalContext} from "./ModalContext"
interface ModalContextProviderProps {
    children: ReactNode;
}

const ModalContextProvider: FC<ModalContextProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [content, setContent] = useState<ReactNode | null>(null)

    const openModal = (content: ReactNode): void => {
        setIsOpen(true);
        setContent(content)
    };

    const closeModal = (): void => {
        setIsOpen(false);
        setContent(null)
    };

    return (
        <ModalContext.Provider value={{isOpen, openModal, closeModal, content}}>
            <Modal/>
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;