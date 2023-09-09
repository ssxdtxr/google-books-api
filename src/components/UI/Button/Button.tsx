import React, {FC} from 'react';
import styles from "./Button.module.scss";

interface IButton {
    onClick: () => void
    placeholder: string
}
export const Button: FC<IButton> = ({onClick, placeholder}) => {
    return (
        <button
            className={styles.loadMore}
            onClick={onClick}
        >
            {placeholder}
        </button>
    );
};

