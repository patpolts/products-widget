export interface Category {
    id: string;
    name: string;
    description: string;
    slug?: string;
    parentId?: string;
}

export interface CategoryListDTO{
    categories: Category[]
}
export interface CategoryDTO{
    category: Category
}