import { ProductImage } from "@application/entities/products/image";
import { ProductSku } from "@application/entities/products/sku";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface AddProductImageRequest {
    productId: string;
    url: string;
    altText?: string;
    featured: boolean;
    position: number;
}

export interface AddProductImageResponse {
    image: ProductImage;
}

@Injectable()
export class AddProductImage {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        request: AddProductImageRequest
    ): Promise<AddProductImageResponse> {

        const { productId, url, altText, featured, position } = request;

        const image = new ProductImage({
            productId,
            url,
            altText,
            featured,
            position
        });

        await this.productRepository.createImage(image)

        return {
            image
        }

    }
}