import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface GetProductRequest {
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
        const { productId } = request;
        const product = await this.productRepository.getById(productId);

        if (!product) return null;

        const productSkus = await this.productRepository.getSkus(product.id);
        const productImages = await this.productRepository.getImages(product.id);

        if (productSkus.length > 0) product.skus = productSkus;
        if (productImages.length > 0) product.images = productImages;

        return {
            product
        }

    }
}