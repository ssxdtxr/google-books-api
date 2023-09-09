import {FC} from 'react';
import {MCard} from "@/components/Card/Card.tsx";
import {IBook} from "@/types/IInfoBooks.ts";

interface ICardList {
    books: IBook[]
}

const bookVariants = {
    hidden: {
        opacity: 0,
    },
    visible: (custom: number) => ({
        opacity: 1,
        transition: {
            delay: custom * .01,
        },
    }),
};

export const CardList: FC<ICardList> = ({books}) => {
    return (
        <>
            {
                books.map((book, index) =>
                    <MCard
                        key={index}
                        book={book}
                        variants={bookVariants}
                        initial={'hidden'}
                        animate={'visible'}
                        custom={index + 1}
                    />)
            }
        </>
    );
};

