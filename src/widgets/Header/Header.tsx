import React, { FC } from 'react';
import styles from './Header.module.css';

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <h1 className={styles.headerTitle}>Каталог товаров</h1>
                <p className={styles.headerSubtitle}>
                    У нас найдется все
                </p>
            </div>
        </header>
    );
};
