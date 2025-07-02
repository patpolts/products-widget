import type { Product } from "~/type/product";

export interface ProductsResponse {
    product: Product[]
}

export interface ProductResponse {
    product: Product
}
export function useProducts() {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBaseUrl;

    const fetchProducts = async (): Promise<ProductsResponse> => {
        const { data, error } = await useFetch<ProductsResponse>('/products', {
            baseURL: `${baseURL}`,
        });

        if (error.value) throw new Error((error.value.message || 'Unexpected error occured'));

        return data.value ?? { product: [] }
    }

    const fetchProductById = async (id: string): Promise<ProductResponse> => {
        const { data, error } = await useFetch<ProductResponse>(`/products/${id}`, {
            baseURL
        })

        if (error.value) throw new Error(error.value.message || 'Erro ao buscar produto')
        return data.value!
    }


    return {
        fetchProducts,
        fetchProductById
    }
}