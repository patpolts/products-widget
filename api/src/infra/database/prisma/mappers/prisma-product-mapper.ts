import { Product as RawProducts } from "@prisma/client";
import { Product } from "@application/entities/products/product";

export class PrismaProductMapper {
    static toPrisma(product: Product) {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            slug: product.slug,
            categoryId: product.categoryId,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
            deletedAt: product.deletedAt
        };
    }

    static toDomain(raw: RawProducts): Product {
        return new Product({
            name: raw.name,
            description: raw.description,
            slug: raw.slug,
            categoryId: raw.categoryId,
            isActive: raw.isActive,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            deletedAt: raw.deletedAt,
        }, raw.id);
    }
}