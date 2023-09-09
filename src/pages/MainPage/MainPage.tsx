import Container from "@/components/Container/Container.tsx";
import styles from "./MainPage.module.scss"
import {Input} from "@components/UI/Input/Input.tsx";
import {ChangeEvent, Fragment, useEffect, useRef, useState} from "react";
import {IOptions, Select} from "@components/UI/Select/Select.tsx";
import {useMutation, useQuery} from "react-query";
import {BooksService} from "@/services/Books/books.service.ts";
import {MCard} from "@components/Card/Card.tsx";
import {ReactComponent as Search} from "@/assets/img/search.svg"
import {useTypedSelectorHook} from "@/hooks/useTypedSelectorHook.ts";
import {useActions} from "@/hooks/useActions.ts";
import {IBook, IInfoBooks} from "@/types/IInfoBooks.ts";
import {useSnackbar} from "notistack";
import {AxiosError} from "axios";
import Skeleton from "@components/Skeleton/Skeleton.tsx";

const categoryOptions = [
    {value: 'all', label: 'All'},
    {value: 'books', label: 'Books'},
    {value: 'magazines', label: 'Magazines'},
];
const sortOptions = [
    {value: 'relevance', label: 'Relevance '},
    {value: 'newest', label: 'Newest '}
]

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
export const MainPage = () => {
    const [inputValue, setInputValue] = useState<string>('')
    const [currentItems, setCurrentItems] = useState<number>(1)
    const [selectedCategory, setSelectedCategory] = useState<IOptions>(categoryOptions[0])
    const {enqueueSnackbar} = useSnackbar();
    const [selectedSort, setSelectedSort] = useState<IOptions>(sortOptions[0])
    const {totalCount, books} = useTypedSelectorHook(state => state.books)
    const {updateTotalCount, updateBooksItems, getBooksItems} = useActions()

    const {mutateAsync, isLoading} = useMutation<IInfoBooks>(['books'], () => BooksService.getBooks({
        q: inputValue,
        orderBy: selectedSort.value,
        printType: selectedCategory.value,
        startIndex: 0,
        maxResults: 30
    }), {
        onSuccess: (data) => {
            updateTotalCount(data.data.totalItems)
            getBooksItems(data.data.items)
            if (!data.data.totalItems)
                return enqueueSnackbar('Unfortunately nothing was found.', {variant: "error"})
        },
        onError: (error: AxiosError<{ error: string }>) => {
            enqueueSnackbar(error.response.data.error.message, {variant: "error"})
        }
    })

    const {mutateAsync: mutateUpdateBooks} = useMutation<IInfoBooks>(['books'], () => BooksService.getBooks({
            q: inputValue,
            orderBy: selectedSort.value,
            printType: selectedCategory.value,
            startIndex: currentItems,
            maxResults: 30
        }), {
            onSuccess: (data) => {
                updateBooksItems(data.data.items)
            }
        }
    )

    const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            await mutateAsync()
        }
    };

    const handleLoadMore = async () => {
        setCurrentItems(prev => prev + 1)
        await mutateUpdateBooks()
    }

    const handleOptionCategory = async (option: IOptions) => {
        setSelectedCategory(option)
        return await mutateAsync()
    }
    const handleOptionSort = async (option: IOptions) => {
        setSelectedSort(option)
        return await mutateAsync()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapperSearch}>
                <Container>
                    <div className={styles.searchSection}>
                        <h1>Search for books</h1>
                        <label>
                            <Input
                                value={inputValue}
                                setValue={handleInput}
                                placeholder='Введите название книги'
                                handleKeyPress={handleKeyPress}
                            />
                            <Search
                                width={35}
                                heigth={35}
                                className={styles.btnSearch}
                                onClick={() => mutateAsync()}
                            />
                        </label>
                        <div className={styles.filter}>
                            {
                                !!books?.length &&
                                <>
                                    <div className={styles.filterItem}>
                                        <span className={styles.nameFilter}>Categories</span>
                                        <Select
                                            options={categoryOptions}
                                            value={selectedCategory}
                                            onChange={option => handleOptionCategory(option)}
                                            placeholder='Выберите категорию...'
                                        />
                                    </div>
                                    <div className={styles.filterItem}>
                                        <span className={styles.nameFilter}>Sorting</span>
                                        <Select
                                            options={sortOptions}
                                            value={selectedSort}
                                            onChange={option => handleOptionSort(option)}
                                            placeholder='Выберите категорию...'
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </Container>
            </div>
            <div className={styles.wrapperCards}>
                <Container>
                    <div className={styles.cardsSection}>
                        <div className={styles.results}>
                            {
                                books?.length ?
                                    <>
                                        <span>Found: {totalCount} results</span>
                                        <div className={styles.searchResults}>
                                            {
                                                isLoading ?
                                                    [...new Array(4)].map((_, index) =>
                                                        <Fragment key={index}>
                                                            <Skeleton width={200} height={490}/>
                                                        </Fragment>
                                                    )
                                                    :
                                                    books.map((book, index) =>
                                                        <MCard
                                                            key={index}
                                                            book={book}
                                                            variants={bookVariants}
                                                            initial={'hidden'}
                                                            animate={'visible'}
                                                            custom={index + 1}
                                                        />
                                                    )
                                            }
                                        </div>
                                        {
                                            totalCount - (currentItems + 1) * 30 > 0 ?
                                                <button
                                                    className={styles.loadMore}
                                                    onClick={handleLoadMore}
                                                >
                                                    load more
                                                </button>
                                                :
                                                ''
                                        }

                                    </>
                                    :
                                    <div className={styles.writeWrapper}>
                                        <div className={styles.writeSome}>
                                            Enter the name of the book that interests you and you will be very
                                            surprised!
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </Container>
            </div>

        </div>
    );
};

