import React, {useEffect, useState} from "react";
import {Product} from "../shared/types/Product";
import {getProducts} from "../api/productsApi";

export const useSearch = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedPage, setSelectedPage] = useState(1);
    const [totalPagesNumber, setTotalPagesNumber] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setIsLoading(true);
                const {products, page, totalPages, productsNumber} = await getProducts(selectedPage,10, searchValue);
                setProducts(products);
                if(page!==selectedPage){
                    setSelectedPage(page);
                }
                if(totalPages!==totalPagesNumber){
                    setTotalPagesNumber(totalPages);
                }
                if(productsNumber!==totalProducts){
                    setTotalProducts(productsNumber)
                }
            } catch (e) {
                setError('Не удалось загрузить товары, попробуйте перезагрузить страницу');
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, [searchValue, selectedPage]);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setSelectedPage(value);
    };

    const handleChangeSearch = (value: string) => {
        setSearchValue(value);
        setSelectedPage(1);
    }
    return{
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
        setSelectedProduct
    }
}
