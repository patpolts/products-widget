import { Category } from "@application/entities/category/category";
import { Prisma } from "@prisma/client";

export abstract class CategoryRepository{
    abstract getAll(): Promise<Category[]>;
    abstract get(categoryId: string): Promise<Category | null>;
    abstract getBySlug(slug: string): Promise<Category | null>;
    abstract getSubCategories(categoryId: string): Promise<Category[]>;
    abstract getCategoryName(categoryId: string): Promise<string | null>;
    abstract create(category: Category): Promise<void>;
    abstract update(id: string, category: Partial<Prisma.CategoryUpdateInput>): Promise<void>;
}