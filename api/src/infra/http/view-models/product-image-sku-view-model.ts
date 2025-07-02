import { ProductImage } from "@application/entities/products/image";


export class ProductSkuImageViewModel{
    static toHttp(img: ProductImage){
        return{
            id: img.id,
            productId: img.productId,
            url: img.url,
            altText: img.altText,
            featured: img.featured,
            position: img.position
        
        }
    }
}