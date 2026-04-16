import React, { FC, useEffect } from 'react';
import { Product } from '../../shared/types/Product';
import { formatPrice } from '../../shared/utils/formatPrice';
import styles from './ProductModal.module.css';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductModal: FC<ProductModalProps> = ({ product, onClose }) => {
    useEffect(() => {
        if (!product) {
            return;
        }

        const handleEscClose = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscClose);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscClose);
            document.body.style.overflow = previousOverflow;
        };
    }, [product, onClose]);

    if (!product) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <button className={styles.modalClose} type={'button'} onClick={onClose} aria-label="Закрыть">
                    ×
                </button>

                <div className={styles.modalContent}>
                    <div className={styles.modalImageWrapper}>
                        <img
                            className={styles.modalImage}
                            src={product.image}
                            alt={product.title}
                        />
                    </div>

                    <div className={styles.modalInfo}>
                        <span className={styles.modalCategory}>{product.category}</span>
                        <h2 className={styles.modalTitle}>{product.title}</h2>
                        <p className={styles.modalDescription}>{product.description}</p>
                        <p className={styles.modalPrice}>{formatPrice(product.price)}</p>

                        <button className={styles.modalBuyButton}>Купить</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
