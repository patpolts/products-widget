import { Product } from "@application/entities/products/product";


export class ProductViewModel{
    static toHttp(product: Product){
        return{
            id: product.id,
            name: product.name,
            description: product.description,
            slug: product.slug,
            category: product.categoryId,
            deletedAt: product.deletedAt
        
        }
    }
}