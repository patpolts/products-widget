import { Category as RawCategories } from "@prisma/client";
import { Category } from "@application/entities/category/category";

export class PrismaCategoryMapper {
    static toPrisma(category: Category) {
        return {
            id: category.id,
            name: category.name,
            description: category.description,
            slug: category.slug,
            parentId: category.parentId,
            isActive: category.isActive,
        };
    }

    static toDomain(raw: RawCategories): Category {
        return new Category({
            name: raw.name,
            slug: raw.slug,
            description: raw.description,
            parentId: raw.parentId,
            isActive: raw.isActive,
            createdAt: raw.createdAt,
        }, raw.id);
    }
}