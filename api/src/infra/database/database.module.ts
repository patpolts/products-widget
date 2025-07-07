import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { ProductRepository } from "@application/repositories/product-repository";
import { PrismaProductsRepository } from "./prisma/repositories/prisma-products-repository";
import { CategoryRepository } from "@application/repositories/category-repository";
import { PrismaCategoriesRepository } from "./prisma/repositories/prisma-categories-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: ProductRepository,
            useClass: PrismaProductsRepository
        },
        {
            provide: CategoryRepository,
            useClass: PrismaCategoriesRepository
        }
    ],
    exports: [ProductRepository, CategoryRepository]
})
export class DatabaseModule {}