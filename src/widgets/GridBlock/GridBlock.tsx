import React, { FC } from 'react';
import { Product } from '../../shared/types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
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
        return <div className={styles.gridBlockState}>Загрузка товаров...</div>;
    }

    if (error) {
        return <div className={`${styles.gridBlockState} ${styles.gridBlockStateError}`}>{error}</div>;
    }

    if (!products.length) {
        return <div className={styles.gridBlockState}>По вашему запросу ничего не найдено</div>;
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
