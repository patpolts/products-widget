import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface GetProductRequest{
    productId: string;
}
interface GetProductResponse {
    product: Product;
}

@Injectable()
export class GetProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: GetProductRequest): Promise<GetProductResponse | null> {
        const {productId} = request;
        const product = await this.productRepository.getById(productId);

        if(!product) return null;

        return {
            product
        }

    }
}