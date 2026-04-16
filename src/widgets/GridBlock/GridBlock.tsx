import React, { FC } from 'react';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../../shared/ProductCard';
import styles from './GridBlock.module.css';

interface GridBlockProps {
    products: Product[];
    isLoading: boolean;
    error: string;
    onCardClick: (product: Product) => void;
}

export const GridBlock: FC<GridBlockProps> = ({
                                                  products,
                                                  isLoading,
                                                  error,
                                                  onCardClick,
                                              }) => {
    if (isLoading) {
        return <div className={styles.gridBlock__state}>Загрузка товаров...</div>;
    }

    if (error) {
        return <div className={`${styles.gridBlock__state} ${styles.gridBlock__state_error}`}>{error}</div>;
    }

    if (!products.length) {
        return <div className={styles.gridBlock__state}>По вашему запросу ничего не найдено</div>;
    }

    return (
        <section className={styles.gridBlock}>
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => onCardClick(product)}
                />
            ))}
        </section>
    );
};
