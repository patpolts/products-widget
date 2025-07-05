import type { Product, ProductDTO, ProductListDTO } from "~/view-models/product"

export const useProductService = () => {
    const config = useRuntimeConfig()

    return {
        list: async (): Promise<Product[]> => {
            const response = await $fetch<ProductListDTO>(`${config.public.apiBaseUrl}/products`)
            return response.product
            
        },
        getById: async (id: string): Promise<ProductDTO> => 
            await $fetch(`${config.public.apiBaseUrl}/products/${id}`),
    }
}