import { ProductImage } from "@application/entities/products/image";
import { ProductSku } from "@application/entities/products/sku";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface AddProductSkuImageRequest {
    productId: string;
    skuId?: string;
    url: string;
    altText?: string;
    featured: boolean;
    position: number;
}

export interface AddProductSkuImageResponse {
    image: ProductImage;
}

@Injectable()
export class AddProductSkuImage {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        request: AddProductSkuImageRequest
    ): Promise<AddProductSkuImageResponse> {

        const { productId, skuId, url, altText, featured, position } = request;

        const image = new ProductImage({
            productId,
            skuId,
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