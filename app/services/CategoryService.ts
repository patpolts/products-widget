import type { Category, CategoryDTO, CategoryListDTO } from "~/types/category"

export const useCategoryService = () => {
    const config = useRuntimeConfig()

    return {
        list: async (): Promise<Category[]> => {
            const response = await $fetch<CategoryListDTO>(`${config.public.apiBaseUrl}/categories`)
            return response.categories
            
        },
        getName: async(id: string): Promise<string> => {
            return await $fetch<string>(`${config.public.apiBaseUrl}/categories/name/${id}`)
        },
        getById: async (id: string | null): Promise<Category | null> => {
            if(!id) return null;
            const response =  await $fetch<CategoryDTO>(`${config.public.apiBaseUrl}/categories/${id}`)
            return response.category
        },
        getBySlug: async (slug: string): Promise<Category> => {
            const response =  await $fetch<CategoryDTO>(`${config.public.apiBaseUrl}/categories/slug/${slug}`)
            return response.category
        },
    }
}