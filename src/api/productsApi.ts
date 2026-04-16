import { Product } from '../shared/types/Product';
import { mockProducts } from './mockProducts';

export const getProducts = async (): Promise<Product[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockProducts);
        }, 600);
    });
};
