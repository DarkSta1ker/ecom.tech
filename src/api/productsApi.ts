import { Product } from '../shared/types/Product';
import { mockProducts } from './mockProducts';

interface GetProductsResult {
    products: Product[];
    page: number;
    totalPages: number;
    productsNumber: number;
}

export const getProducts = async (
    page: number,
    perPage: number,
    searchValue?: string,
    markers?: string[],
    maxCost?: number,
    minCost?: number,
): Promise<GetProductsResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const normalizedSearch = searchValue?.trim().toLowerCase() || '';
            const start = (page - 1) * perPage;
            const end = start + perPage;

            let products = [...mockProducts];

            if (normalizedSearch) {
                products = products.filter((product) =>
                    product.title.toLowerCase().includes(normalizedSearch)
                );
            }

            if (markers && markers.length > 0) {
                products = products.filter((product) =>
                    markers.includes(product.category)
                );
            }

            if (typeof maxCost === 'number' && !Number.isNaN(maxCost)) {
                products = products.filter((product) => product.price <= maxCost);
            }

            if (typeof minCost === 'number' && !Number.isNaN(minCost)) {
                products = products.filter((product) => product.price >= minCost);
            }

            const productsNumber = products.length;
            const totalPages = Math.ceil(products.length / perPage) || 1;
            const paginatedProducts = products.slice(start, end);

            resolve({
                products: paginatedProducts,
                page,
                totalPages,
                productsNumber,
            });
        }, 600);
    });
};
