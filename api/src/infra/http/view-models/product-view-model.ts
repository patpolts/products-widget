import { Product } from "@application/entities/products/product";
import { ProductSkuViewModel } from "./product-sku-view-model";
import { ProductImageViewModel } from "./product-image-view-model";


export class ProductViewModel{
    static toHttp(product: Product){
        return{
            id: product.id,
            name: product.name,
            description: product.description,
            slug: product.slug,
            category: product.categoryId,
            skus: (product.skus ?? []).map((sku) => ProductSkuViewModel.toHttp(sku)),
            images: (product.images ?? []).map((img) => ProductImageViewModel.toHttp(img)),
            deletedAt: product.deletedAt
        
        }
    }
}