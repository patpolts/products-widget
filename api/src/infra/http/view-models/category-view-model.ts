import { Category } from "@application/entities/category/category";




export class CategoryViewModel{
    static toHttp(category: Category){
        return{
            id: category.id,
            name: category.name,
            description: category.description,
            slug: category.slug,
            parentId: category.parentId,
            isActive: category.isActive
        
        }
    }
}