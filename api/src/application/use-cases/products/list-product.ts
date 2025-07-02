import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

export interface ListProductResponse {
    products: Product[];
}

@Injectable()
export class ListProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(): Promise<ListProductResponse> {
        const products = await this.productRepository.getAll();

        return {
            products
        }

    }
}