import { ProductSku } from "@application/entities/products/sku";
import { ProductImageViewModel } from "./product-image-view-model";


export class ProductSkuViewModel{
    static toHttp(sku: ProductSku){
        return{
            id: sku.id,
            productId: sku.productId,
            code: sku.code,
            size: sku.size,
            color: sku.color,
            dimensions: sku.dimensions,
            price: sku.price,
            stock: sku.stock,
            images: (sku.images ?? []).map((img) => ProductImageViewModel.toHttp(img))
        }
    }
}