import React, {FC, ChangeEvent, useState, useCallback} from 'react';
import styles from './FiltersBlock.module.css';
import {debounce} from "../../shared/utils/debounce";
interface FiltersBlockProps {
    value: string;
    onChange: (value: string) => void;
    total: number;
}

export const FiltersBlock: FC<FiltersBlockProps> = ({ value, onChange, total }) => {
    const [inpVal, setInpVal] = useState(value|| '');

    const debouncedChange = useCallback(
        debounce<string>(
            (newValue: string)=>{
                onChange(newValue);
                }
            , 300)
        ,[onChange])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInpVal(event.target.value);
        debouncedChange(event.target.value);
    }

    return (
        <section className={styles.filtersBlock}>
            <div className={styles.filtersBlockContent}>
                <div className={styles.filtersBlockInfo}>
                    <h2 className={styles.filtersBlockTitle}>Поиск товаров</h2>
                    <p className={styles.filtersBlockCount}>Найдено: {total}</p>
                </div>

                <input
                    className={styles.filtersBlockInput}
                    type="text"
                    placeholder="Введите название товара..."
                    value={inpVal}
                    onChange={handleChange}
                />
            </div>
        </section>
    );
};
