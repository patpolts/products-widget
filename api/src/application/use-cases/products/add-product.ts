import { Injectable } from "@nestjs/common";
import { Product } from "@application/entities/products/product";
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