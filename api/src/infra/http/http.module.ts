import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/product.controller";
import { AddProduct } from "@application/use-cases/products/add-product";
import { ListProduct } from "@application/use-cases/products/list-product";
import { AddProductImage } from "@application/use-cases/products/add-product-image";
import { AddProductSku } from "@application/use-cases/products/add-product-sku";
import { DatabaseModule } from "@infra/database/database.module";
import { GetProduct } from "@application/use-cases/products/get-product";
import { UpdateProduct } from "@application/use-cases/products/update-product";
import { RemoveProduct } from "@application/use-cases/products/remove-product";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController],
    providers: [
        GetProduct,
        ListProduct,
        AddProduct,
        AddProductSku,
        AddProductImage,
        UpdateProduct,
        RemoveProduct
    ]
})
export class HttpModule {}