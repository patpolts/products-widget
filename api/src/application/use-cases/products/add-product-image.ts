import { ProductImage } from "@application/entities/products/image";
import { ProductSku } from "@application/entities/products/sku";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface AddProductImageRequest {
    productId: string;
    imageId?: string;
    skuId?: string;
    url: string;
    altText?: string;
    featured: boolean;
    position: number;
}

export interface AddProductImageResponse {
    error: boolean;
    message: string;
    image?: ProductImage;
}

@Injectable()
export class AddProductImage {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        request: AddProductImageRequest
    ): Promise<AddProductImageResponse> {
        try {
            const {productId, imageId, skuId, url, altText, featured, position } = request;

            const image = new ProductImage({
                productId,
                imageId,
                skuId,
                url,
                altText,
                featured,
                position
            });

            await this.productRepository.createImage(image)

            return {
                error: false,
                message: "Product saved successfully",
                image
            }
            
        } catch (error) {
            return {
                error: true,
                message: error instanceof Error ? error.message : "An unexpected error occurred",
            }
        }
    }
}