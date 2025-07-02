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

        for(const p of products){
            const productSkus = await this.productRepository.getSkus(p.id);
            const productImages = await this.productRepository.getImages(p.id);

            if(productSkus.length > 0) p.skus = productSkus;
            if(productImages.length > 0) p.images = productImages;
        }

        return {
            products
        }

    }
}