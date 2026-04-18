import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '../shared/types/Product';
import { getProducts } from '../api/productsApi';
import { mockProducts } from '../api/mockProducts';

export const useSearch = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
    const [totalPagesNumber, setTotalPagesNumber] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = useMemo(() => {
        return Array.from(new Set(mockProducts.map((product) => product.category))).sort();
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setError('');

                const { products, page, totalPages, productsNumber } = await getProducts(
                    selectedPage,
                    12,
                    searchValue,
                    selectedCategories,
                    maxPrice ? Number(maxPrice) : undefined,
                    minPrice ? Number(minPrice) : undefined
                );

                setProducts(products);

                if (page !== selectedPage) {
                    setSelectedPage(page);
                }

                if (totalPages !== totalPagesNumber) {
                    setTotalPagesNumber(totalPages);
                }

                if (productsNumber !== totalProducts) {
                    setTotalProducts(productsNumber);
                }
            } catch (e) {
                setError('Не удалось загрузить товары, попробуйте перезагрузить страницу');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, [searchValue, selectedPage, selectedCategories, minPrice, maxPrice]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setSelectedPage(value);
    };

    const handleChangeSearch = (value: string) => {
        setSearchValue(value);
        setSelectedPage(1);
    };

    const handleMinPriceChange = (value: string) => {
        setMinPrice(value);
        setSelectedPage(1);
    };

    const handleMaxPriceChange = (value: string) => {
        setMaxPrice(value);
        setSelectedPage(1);
    };

    const handleCategoriesChange = (value: string[]) => {
        setSelectedCategories(value);
        setSelectedPage(1);
    };

    const handleResetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setSelectedCategories([]);
        setSelectedPage(1);
    };

    return {
        products,
        searchValue,
        selectedProduct,
        handleChangePage,
        setSelectedPage,
        isLoading,
        error,
        selectedPage,
        totalPagesNumber,
        totalProducts,
        handleChangeSearch,
        setSelectedProduct,
        handleResetFilters,
        minPrice,
        maxPrice,
        selectedCategories,
        handleMinPriceChange,
        handleMaxPriceChange,
        handleCategoriesChange,
        categories,
    };
};
