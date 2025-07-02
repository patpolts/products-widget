import { ProductImage as RawProductImages } from "@prisma/client";
import { ProductImage } from "@application/entities/products/image";

export class PrismaProductImageMapper {
    static toPrisma(image: ProductImage) {
        return {
            id: image.id,
            productId: image.productId,
            url: image.url,
            altText: image.altText,
            featured: image.featured,
            position: image.position
        };
    }

    static toDomain(raw: RawProductImages): ProductImage {
        return new ProductImage({
            productId: raw.productId,
            url: raw.url,
            altText: raw.altText ?? undefined,
            featured: raw.featured,
            position: raw.position
        }, raw.id);
    }
}