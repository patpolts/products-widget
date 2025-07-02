import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateProductBody } from "@infra/http/dtos/create-product-body";
import { AddProduct } from "@application/use-cases/products/add-product";
import { ProductSku } from "@application/entities/products/sku";
import { CreateProductSkuBody } from "../dtos/create-product-sku-body";
import { AddProductSku } from "@application/use-cases/products/add-product-sku";
import { CreateProductImageBody } from "../dtos/create-product-image-body";
import { AddProductImage } from "@application/use-cases/products/add-product-image";
import { ProductImage } from "@application/entities/products/image";
import { ListProduct } from "@application/use-cases/products/list-product";
import { ProductViewModel } from "../view-models/product-view-model";
import { GetProduct } from "@application/use-cases/products/get-product";
import { UpdateProductBody } from "../dtos/update-product-body";
import { UpdateProduct } from "@application/use-cases/products/update-product";
import { RemoveProduct } from "@application/use-cases/products/remove-product";
import { ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "@application/entities/products/product";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(
        private getProduct: GetProduct,
        private listProducts: ListProduct,
        private addProducts: AddProduct,
        private addProductSku: AddProductSku,
        private addProductImage: AddProductImage,
        private updateProduct: UpdateProduct,
        private removeProduct: RemoveProduct
    ) { }

    @Get()
    @ApiTags('products-list')
    @ApiOperation({summary: 'List active products'})
    @ApiResponse({status: 200, description: 'Products list or empty array.'})
    async list(){
        const {products} = await this.listProducts.execute();
        
        return {
            product: products.map((product) => ProductViewModel.toHttp(product))
        }
    }

    @ApiOperation({summary: 'Get a product details.'})
    @ApiResponse({status: 200, description: 'Success: Product details.'})
    @ApiResponse({status: 404, description: 'Error: Product not found.'})
    @Get(':id')
    async productDetail(@Param('id') id: string){
        const response = await this.getProduct.execute({productId: id});

        if (!response || !response.product) {
            return {
                product: null
            };
        }
        
        return {
            product: ProductViewModel.toHttp(response.product)
        }
    }

    @Post()
    @ApiOperation({summary: 'Create a product.'})
    @ApiResponse({status: 201, description: 'Product created.'})
    @ApiCreatedResponse({
        description: 'The product has been successfully  created.',
        type: Product
    })
    async create(@Body() body: CreateProductBody) {
        const { name, description, slug, categoryId, isActive } = body;
        const { product } = await this.addProducts.execute({
            name,
            description,
            slug,
            categoryId,
            isActive,
        });

        return {
            product: ProductViewModel.toHttp(product),
        };
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a product.'})
    @ApiResponse({status: 201, description: 'Product updated.'})
    @ApiResponse({status: 404, description: 'Product to update not found.'})
    async productUpdate(@Param('id') id: string, @Body() body: UpdateProductBody){
        const {product} = await this.updateProduct.execute({productId: id, data: body});
        
        return ProductViewModel.toHttp(product);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Soft delete a product.'})
    async deleteProduct(@Param('id') id: string){
        const {product} = await this.removeProduct.execute({productId: id});

        return ProductViewModel.toHttp(product);
    }

}