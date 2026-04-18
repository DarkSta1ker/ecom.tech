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
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const normalizedSearch = searchValue?.trim().toLowerCase() || null;
            const marks = markers?.length || 0
            const start = (page - 1) * perPage;
            const end = start + perPage;
            let products = mockProducts
            if (normalizedSearch) {
                products = products.filter((product) =>
                    product.title.toLowerCase().includes(normalizedSearch)
                );
            }
            if (markers && marks>0){
                products = products.filter((product) =>
                    product.category in markers
                )
            }
            if (maxCost) {
                products = products.filter((product) =>
                product.price<=maxCost)
            }
            if (minCost) {
                products = products.filter((product) =>
                product.price>=minCost)
            }
            const productsNumber = products.length
            const totalPages = Math.ceil(products.length / perPage);
            products = products.slice(start, end);

            resolve({
                products,
                page,
                totalPages,
                productsNumber,
            });
        }, 600);
    });
};
