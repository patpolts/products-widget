import { ProductImage } from "@application/entities/products/image";
import { ProductSku } from "@application/entities/products/sku";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface AddProductSkuRequest {
    productId: string;
    code: string;
    size?: string;
    color?: string;
    dimensions?: string;
    price: number;
    stock: number;
    images?: ProductImage[]
}

export interface AddProductSkuResponse {
    error: boolean;
    message: string;
    sku?: ProductSku;
}

@Injectable()
export class AddProductSku {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        request: AddProductSkuRequest
    ): Promise<AddProductSkuResponse> {
        try {
            const {productId, code, size, color, dimensions, price, stock, images } = request;

            const sku = new ProductSku({
                productId,
                code,
                size,
                color,
                dimensions,
                price,
                stock,
                images
            });

            await this.productRepository.createSku(sku)

            return {
                error: false,
                message: "Product saved successfully",
                sku
            }
            
        } catch (error) {
            return {
                error: true,
                message: error instanceof Error ? error.message : "An unexpected error occurred",
            }
        }
    }
}