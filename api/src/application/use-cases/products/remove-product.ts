import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";
import { ProductNotFound } from "@application/use-cases/errors/product-not-found";

interface RemoveProductRequest {
    productId: string;
}
interface RemoveProductResponse {
    product: Product;
}

@Injectable()
export class RemoveProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: RemoveProductRequest): Promise<RemoveProductResponse> {
        const { productId } = request;
        const product = await this.productRepository.getById(productId);

        if (!product) throw new ProductNotFound;

        product.isActive = false;

        await this.productRepository.delete(productId)

        return {
            product
        }

    }
}