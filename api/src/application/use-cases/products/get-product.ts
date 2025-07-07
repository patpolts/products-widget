import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

type Pagination = {
    page: number;
    limit: number;
    total: number;
    lastPAge: number;
}

interface GetProductRequest {
    productId?: string;
    slug?: string;
}
interface GetProductResponse {
    product: Product;
    pagination?: Pagination;
}

@Injectable()
export class GetProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: GetProductRequest): Promise<GetProductResponse | null> {
        const { productId, slug } = request;
        const product = productId ? 
            await this.productRepository.getById(productId) : 
                ( slug ? await this.productRepository.getBySlug(slug) : null);

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