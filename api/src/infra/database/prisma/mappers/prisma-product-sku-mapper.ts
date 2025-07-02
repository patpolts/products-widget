import { ProductSku as RawProductsSku } from "@prisma/client";
import { ProductSku } from "@application/entities/products/sku";

export class PrismaProductSkuMapper {
    static toPrisma(sku: ProductSku) {
        return {
            id: sku.id,
            productId: sku.productId,
            code: sku.code,
            size: sku.size,
            color: sku.color,
            dimensions: sku.dimensions,
            price: sku.price,
            stock: sku.stock,
            deletedAt: sku.deletedAt
        };
    }

    static toDomain(raw: RawProductsSku): ProductSku {
        return new ProductSku({
            productId: raw.productId,
            code: raw.code,
            size: raw.size ?? undefined,
            color: raw.color ?? undefined,
            dimensions: raw.dimensions ?? undefined,
            price: raw.price.toNumber(),
            stock: raw.stock,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            deletedAt: raw.deletedAt
        }, raw.id);
    }
}