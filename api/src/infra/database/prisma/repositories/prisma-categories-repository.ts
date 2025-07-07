import { Category } from "@application/entities/category/category";
import { CategoryRepository } from "@application/repositories/category-repository";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { PrismaCategoryMapper } from "../mappers/prisma-category-mapper";

@Injectable()
export class PrismaCategoriesRepository implements CategoryRepository{
    constructor(private prismaService: PrismaService){}

    async getAll(): Promise<Category[]> {
        const categories = await this.prismaService.category.findMany({
            where: {
                isActive: true
            },
            orderBy: {
                name: "asc"
            }
        });

        return categories.map(PrismaCategoryMapper.toDomain);
    }

    async get(categoryId: string): Promise<Category | null> {
        const category = await this.prismaService.category.findUnique({
            where: {
                id: categoryId,
                isActive: true
            }
        });

        if(!category) return null;

        return  PrismaCategoryMapper.toDomain(category);
    }

    async getBySlug(slug: string): Promise<Category | null> {
        const category = await this.prismaService.category.findUnique({
            where: {
                slug: slug,
                isActive: true
            }
        });

        if(!category) return null;

        return  PrismaCategoryMapper.toDomain(category);
    }

    async getSubCategories(categoryId: string): Promise<Category[]> {
        const categories = await this.prismaService.category.findMany({
            where: {
                parentId: categoryId,
                isActive: true
            }
        });

        return  categories.map(PrismaCategoryMapper.toDomain);
    }

    async getCategoryName(categoryId: string): Promise<string | null> {
        const category = await this.prismaService.category.findUnique({
            where: {
                id: categoryId
            }
        });

        if(!category) return null;

        return category.name;
    }

    async create(category: Category): Promise<void> {
        const raw = PrismaCategoryMapper.toPrisma(category);

        await this.prismaService.category.create({
            data: raw
        })
    }

    async update(id: string, category: Partial<Prisma.CategoryUpdateInput>): Promise<void> {
        await this.prismaService.category.update({
            where: {
                id: id
            },
            data: category
        });
    }
    
}