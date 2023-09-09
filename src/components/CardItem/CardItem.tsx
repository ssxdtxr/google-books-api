import {FC} from 'react';
import {ICard} from "@/components/Card/Card.tsx";
import styles from "./CardItem.module.scss"

export const CardItem: FC<ICard> = ({book}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.imgSection}>
                <img
                    src={book.volumeInfo.imageLinks?.smallThumbnail || book.volumeInfo.imageLinks?.thumbnail}
                    alt={book.volumeInfo.title}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.authors}>{book.volumeInfo.authors.join(", ") || 'unknown'}</div>
                <h1 className={styles.title}>{book.volumeInfo.title}</h1>
                <p>{book.searchInfo.textSnippet}</p>
            </div>
        </div>
    );
};

