import {ChangeEvent, FC} from "react";
import s from "./Input.module.scss"

interface IInput {
    value: string
    setValue: (e: ChangeEvent<HTMLInputElement>) => void
    handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void
    placeholder: string
}

export const Input: FC<IInput> = ({ placeholder, setValue, value, handleKeyPress}) => {
    return (
        <input
            autoFocus
            className={s.input}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={setValue}
            onKeyDown={handleKeyPress}
        />
    );
};

