import type { Category, CategoryDTO, CategoryListDTO } from "~/types/category"
import type { Product, ProductDTO, ProductListDTO } from "~/types/product"

export const useProductService = () => {
    const config = useRuntimeConfig()

    return {
        list: async (page:Number = 1, limit:Number = 10,categoryId?:string,order?: string): Promise<ProductListDTO> => {
            const query: Record<string, any> = {page,limit,order}
            if(categoryId) query.categoryId = categoryId 
            const response = await $fetch<ProductListDTO>(`${config.public.apiBaseUrl}/products`,{
                query,
            })
            
            return {
                product: response.product,
                pagination: response.pagination
            }
            
        },
        getById: async (id: string): Promise<Product> => {
            const response =  await $fetch<ProductDTO>(`${config.public.apiBaseUrl}/products/${id}`)
            return response.product
        },
        getBySlug: async (slug: string): Promise<Product> => {
            const response =  await $fetch<ProductDTO>(`${config.public.apiBaseUrl}/products/slug/${slug}`)
            return response.product
        },
        getCategories: async(id:string): Promise<Category[]> => {
            const response =  await $fetch<CategoryListDTO>(`${config.public.apiBaseUrl}/products/categories/${id}`)
            return response.categories

        }
    }
}