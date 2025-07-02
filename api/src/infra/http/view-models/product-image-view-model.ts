import { ProductImage } from "@application/entities/products/image";


export class ProductImageViewModel{
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