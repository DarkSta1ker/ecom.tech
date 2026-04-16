import React, { FC } from 'react';
import styles from './Header.module.css';

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <h1 className={styles.header__title}>Каталог товаров</h1>
                <p className={styles.header__subtitle}>
                    У нас найдется все
                </p>
            </div>
        </header>
    );
};
