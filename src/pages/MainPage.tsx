import React, { FC, useEffect, useMemo, useState } from 'react';
import { FiltersBlock } from '../widgets/FiltersBlock/FiltersBlock';
import { GridBlock } from '../widgets/GridBlock/GridBlock';
import { Header } from '../widgets/Header/Header';
import { Footer } from '../widgets/Footer/Footer';
import { ProductModal } from '../widgets/ProductModal/ProductModal';
import { getProducts } from '../api/productsApi';
import { Product } from '../shared/types/Product';
import styles from './MainPage.module.css';

export const MainPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const data = await getProducts();
                setProducts(data);
            } catch (e) {
                setError('Не удалось загрузить товары');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        if (!normalizedSearch) {
            return products;
        }

        return products.filter((product) =>
            product.title.toLowerCase().includes(normalizedSearch)
        );
    }, [products, searchValue]);


    return (
        <div className={styles.mainPage}>
            {
                selectedProduct  &&
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            }
            <Header />

            <main className={styles.mainPage__content}>
                <FiltersBlock
                    value={searchValue}
                    onChange={setSearchValue}
                    total={filteredProducts.length}
                />

                <GridBlock
                    products={filteredProducts}
                    isLoading={isLoading}
                    error={error}
                    onCardClick={setSelectedProduct}
                />
            </main>

            <Footer />
        </div>
    );
};
