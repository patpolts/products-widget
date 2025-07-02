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
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "@application/entities/products/product";
import { ProductSkuViewModel } from "../view-models/product-sku-view-model";
import { ProductImageViewModel } from "../view-models/product-image-view-model";
import { CreateProductSkuImageBody } from "../dtos/create-product-sku-image-body";
import { AddProductSkuImage } from "@application/use-cases/products/add-product-sku-image";
import { ProductSkuImageViewModel } from "../view-models/product-image-sku-view-model";

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(
        private getProduct: GetProduct,
        private listProducts: ListProduct,
        private addProducts: AddProduct,
        private addProductSku: AddProductSku,
        private addProductImage: AddProductImage,
        private addProductSkuImage: AddProductSkuImage,
        private updateProduct: UpdateProduct,
        private removeProduct: RemoveProduct
    ) { }

    @Get()
    @ApiOperation({ summary: 'List of active products' })
    @ApiOkResponse({
        description: 'Products list or empty array.',
        schema: {
            example: {
                "product": [
                    {
                        "id": "f8fcf5c5-c48e-49d2-9c56-3e4651fd0beb",
                        "name": "Product Test",
                        "description": "This is a test product updated",
                        "slug": "product-test",
                        "category": "168a5894-25c0-4d4c-97cb-2343ec86dca8",
                        "skus": [
                            {
                                "id": "d7174808-d7af-4e51-9c19-bd84349232ea",
                                "productId": "f8fcf5c5-c48e-49d2-9c56-3e4651fd0beb",
                                "code": "SKU-TEST-001",
                                "dimensions": "100x200",
                                "price": 1000,
                                "stock": 20,
                                "images": []
                            }
                        ],
                        "images": [
                            {
                                "id": "3e9bdb62-4ea2-49db-9a01-3dcce6332af0",
                                "productId": "f8fcf5c5-c48e-49d2-9c56-3e4651fd0beb",
                                "url": "https://b-plannow.com/wp-content/uploads/2023/10/Product-testing-how-to-prepare-for-launch.png",
                                "altText": "Test Image",
                                "featured": true,
                                "position": 0
                            }
                        ],
                        "deletedAt": null
                    }
                ]
            }
        }
    })
    async list() {
        const { products } = await this.listProducts.execute();

        return {
            product: products.map((product) => ProductViewModel.toHttp(product))
        }
    }

    @ApiOperation({ summary: 'Get a product details.' })
    @ApiResponse({ status: 200, description: 'Success: Product details.' })
    @ApiResponse({ status: 404, description: 'Error: Product not found.' })
    @Get(':id')
    async productDetail(@Param('id') id: string) {
        const response = await this.getProduct.execute({ productId: id });

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
    @ApiOperation({ summary: 'Create a product.' })
    @ApiResponse({ status: 201, description: 'Product created.' })
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
    @ApiOperation({ summary: 'Update a product.' })
    @ApiResponse({ status: 201, description: 'Product updated.' })
    @ApiResponse({ status: 404, description: 'Product to update not found.' })
    async productUpdate(@Param('id') id: string, @Body() body: UpdateProductBody) {
        const { product } = await this.updateProduct.execute({ productId: id, data: body });

        return ProductViewModel.toHttp(product);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete a product.' })
    async deleteProduct(@Param('id') id: string) {
        const { product } = await this.removeProduct.execute({ productId: id });

        return ProductViewModel.toHttp(product);
    }

    @Post('image')
    @ApiOperation({ summary: 'Create a product image.' })
    @ApiResponse({ status: 201, description: 'Product image created.' })
    @ApiCreatedResponse({
        description: 'The product image has been successfully  created.',
        type: ProductImage
    })
    async createProductImage(@Body() body: CreateProductImageBody) {
        const { productId, url, altText, featured, position } = body;

        const { image } = await this.addProductImage.execute({
            productId,
            url,
            altText,
            featured,
            position,
        });

        return {
            image: ProductImageViewModel.toHttp(image)
        }
    }

    @Post('sku')
    @ApiOperation({ summary: 'Create a product sku.' })
    @ApiResponse({ status: 201, description: 'Product created.' })
    @ApiCreatedResponse({
        description: 'The product has been successfully  created.',
        type: Product
    })
    async createProductSku(@Body() body: CreateProductSkuBody) {
        const { productId, code, size, color, dimensions, price, stock, deletedAt } = body;

        const { sku } = await this.addProductSku.execute({
            productId,
            code,
            size,
            color,
            dimensions,
            price,
            stock,
            deletedAt: deletedAt ?? null,
        });

        return {
            sku: ProductSkuViewModel.toHttp(sku)
        }
    }

    @Post('sku/image')
    @ApiOperation({ summary: 'Create a product image.' })
    @ApiResponse({ status: 201, description: 'Product image created.' })
    @ApiCreatedResponse({
        description: 'The product image has been successfully  created.',
        type: ProductImage
    })
    async createProductSkuImage(@Body() body: CreateProductSkuImageBody) {
        const { productId, skuId, url, altText, featured, position } = body;

        const { image } = await this.addProductSkuImage.execute({
            productId,
            skuId,
            url,
            altText,
            featured,
            position,
        });

        return {
            image: ProductSkuImageViewModel.toHttp(image)
        }
    }


}