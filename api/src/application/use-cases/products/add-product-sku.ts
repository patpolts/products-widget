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
    deletedAt: Date | null;
}

export interface AddProductSkuResponse {
    sku: ProductSku;
}

@Injectable()
export class AddProductSku {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(
        request: AddProductSkuRequest
    ): Promise<AddProductSkuResponse> {
        const { productId, code, size, color, dimensions, price, stock, deletedAt } = request;

        const sku = new ProductSku({
            productId,
            code,
            size,
            color,
            dimensions,
            price,
            stock,
            deletedAt
        });

        await this.productRepository.createSku(sku)

        return {
            sku
        }
    }
}