import React, { FC } from 'react';
import { FiltersBlock } from '../widgets/FiltersBlock/FiltersBlock';
import { GridBlock } from '../widgets/GridBlock/GridBlock';
import { Header } from '../widgets/Header/Header';
import { Footer } from '../widgets/Footer/Footer';
import { ProductModal } from '../widgets/ProductModal/ProductModal';
import styles from './MainPage.module.css';
import Pagination from '@mui/material/Pagination';
import { useSearch } from '../hooks/useSearch';

export const MainPage: FC = () => {
    const {
        selectedPage,
        selectedProduct,
        setSelectedProduct,
        searchValue,
        handleChangeSearch,
        totalProducts,
        totalPagesNumber,
        products,
        isLoading,
        error,
        handleChangePage,
        minPrice,
        maxPrice,
        selectedCategories,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleCategoriesChange,
        categories,
        handleResetFilters
    } = useSearch();

    return (
        <div className={styles.mainPage}>
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            <Header />

            <div className={styles.mainPageContent}>
                <FiltersBlock
                    value={searchValue}
                    onChange={handleChangeSearch}
                    total={totalProducts}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinPriceChange={handleMinPriceChange}
                    onMaxPriceChange={handleMaxPriceChange}
                    selectedCategories={selectedCategories}
                    onCategoriesChange={handleCategoriesChange}
                    categories={categories}
                    onResetFilters={handleResetFilters}
                />

                <GridBlock
                    products={products}
                    isLoading={isLoading}
                    error={error}
                    onCardClick={setSelectedProduct}
                />

                <Pagination
                    count={totalPagesNumber}
                    page={selectedPage}
                    onChange={handleChangePage}
                    size="large"
                />
            </div>

            <Footer />
        </div>
    );
};
