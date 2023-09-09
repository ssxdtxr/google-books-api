
import { FC, useEffect, useState, MouseEvent} from "react";
import s from './Select.module.scss'
import cn from "classnames"
export interface IOptions {
    value: string
    label: string
}

interface ISelect {
    options: IOptions[]
    value?: IOptions
    onChange: (value: IOptions | undefined) => void
    placeholder: string
}

export const Select: FC<ISelect> = ({options, value, onChange, placeholder}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0)

    const selectOption = (option: IOptions): void => {
        if (option !== value) onChange(option)
        setIsOpen(true)
    }

    const isOptionSelected = (option: IOptions) => {
        return option === value
    }

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0)
    }, [isOpen])
    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen(prev => !prev)}
            tabIndex={0}
            className={s.container}
        >
            <span className={s.value}>{value?.label || placeholder}</span>
            <div className={s.divider}></div>
            <div className={s.caret}></div>
            <ul className={cn(s.options, isOpen ? s.show : '')}>
                {options.map((option, index) => (
                    <li
                        key={option.label}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={cn(s.option, isOptionSelected(option) ? s.selected : '', index === highlightedIndex ? s.highlighter : '')}
                        onClick={() => selectOption(option)}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

