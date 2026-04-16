import React, { FC, ChangeEvent } from 'react';
import styles from './FiltersBlock.module.css';

interface FiltersBlockProps {
    value: string;
    onChange: (value: string) => void;
    total: number;
}

export const FiltersBlock: FC<FiltersBlockProps> = ({ value, onChange, total }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

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
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </section>
    );
};
