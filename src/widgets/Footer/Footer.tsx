import React, { FC } from 'react';
import styles from './Footer.module.css';

export const Footer: FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContainer}>
                <p className={styles.footerText}>© 2026 Каталог товаров</p>
            </div>
        </footer>
    );
};
