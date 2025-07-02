import { Injectable } from "@nestjs/common";
import { ProductAttribute } from "@application/entities/products/attribute";
import { ProductImage } from "@application/entities/products/image";
import { Product } from "@application/entities/products/product";
import { ProductSku } from "@application/entities/products/sku";
import { ProductRepository } from "@application/repositories/product-repository";

interface AddProductRequest {
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    isActive: boolean;
}

interface AddProductResponse {
    product: Product;
}

@Injectable()
export class AddProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        request: AddProductRequest
    ): Promise<AddProductResponse> {
        const { name, description, slug, categoryId, isActive } = request;

        const product = new Product({
            name,
            description,
            slug,
            categoryId,
            isActive
        });
        
        await this.productRepository.create(product);

        return {
            product
        }

    }
}