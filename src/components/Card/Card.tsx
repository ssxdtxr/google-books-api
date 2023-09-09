import React, {FC, forwardRef, useContext} from 'react';
import styles from "./Card.module.scss"
import {IBook} from "@/types/IInfoBooks.ts";
import {ModalContext} from "@/context/ModalContext.ts";
import {CardItem} from "@components/CardItem/CardItem.tsx";
import {motion} from "framer-motion";

export interface ICard {
    book: IBook
}

export const Card: FC<ICard> = forwardRef(({book}, ref) => {
    const {openModal} = useContext(ModalContext)
    const openUserModal = () => {
        openModal(<CardItem book={book}/>)
    }
    return (
        <article
            className={styles.cardWrapper}
            onClick={openUserModal}
            ref={ref}
        >
            <div className={styles.cardTop}>
                <img
                    width={170}
                    height={270}
                    src={book.volumeInfo.imageLinks?.smallThumbnail || book.volumeInfo.imageLinks?.thumbnail}
                    alt={book.volumeInfo.title}
                />
                <div className={styles.category}>{book.volumeInfo.categories || 'unknown'}</div>
            </div>
            <div className={styles.cardBottom}>
                <div className={styles.title}>{book.volumeInfo.title}</div>
                <div className={styles.auth}>{book.volumeInfo.authors || 'unknown'}</div>
            </div>
        </article>
    );
});
export const MCard = motion(Card)
