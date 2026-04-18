import { Product } from '../shared/types/Product';
import { mockProducts } from './mockProducts';

interface GetProductsResult {
    products: Product[];
    page: number;
    totalPages: number;
}

export const getProducts = async (
    page: number = 1,
    perPage: number = 10,
    searchValue?: string,
    markers?: string[],
): Promise<GetProductsResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const normalizedSearch = searchValue?.trim().toLowerCase() || null;
            const marks = markers?.length || 0
            const totalPages = Math.ceil(mockProducts.length / perPage);
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const products = mockProducts.slice(start, end);
            if (normalizedSearch) {
                products.filter((product) =>
                    product.title.toLowerCase().includes(normalizedSearch)
                );
            }
            if (markers && marks>0){
                products.filter((product) =>
                    product.category in markers
                )
            }
            resolve({
                products,
                page,
                totalPages,
            });
        }, 600);
    });
};
