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
import { AddProductSkuImage } from "@application/use-cases/products/add-product-sku-image";
import { CategoryController } from "./controllers/category.controller";
import { GetCategory } from "@application/use-cases/categories/get-category";
import { GetCategories } from "@application/use-cases/categories/get-categories";
import { AddCategory } from "@application/use-cases/categories/add-category";
import { UpdateCategory } from "@application/use-cases/categories/update-category";
import { GetCategoryName } from "@application/use-cases/categories/get-categoryName";
import { FilterProductByCategory } from "@application/use-cases/products/filter-product-by-category";

@Module({
    imports: [DatabaseModule],
    controllers: [ProductController, CategoryController],
    providers: [
        GetProduct,
        ListProduct,
        AddProduct,
        AddProductSku,
        AddProductImage,
        AddProductSkuImage,
        UpdateProduct,
        RemoveProduct,
        GetCategory,
        GetCategoryName,
        GetCategories,
        AddCategory,
        UpdateCategory,
        FilterProductByCategory,
    ]
})
export class HttpModule {}