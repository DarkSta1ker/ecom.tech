import React, { FC } from 'react';
import { Product } from '../../shared/types/Product';
import { formatPrice } from '../../shared/utils/formatPrice';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <article className={styles.productCard} onClick={onClick}>
            <div className={styles.productCardImageWrapper}>
                <img
                    className={styles.productCardImage}
                    src={product.image}
                    alt={product.title}
                />
            </div>

            <div className={styles.productCardBody}>
                <span className={styles.productCardCategory}>{product.category}</span>
                <h3 className={styles.productCardTitle}>{product.title}</h3>
                <p className={styles.productCardPrice}>{formatPrice(product.price)}</p>
            </div>
        </article>
    );
};
