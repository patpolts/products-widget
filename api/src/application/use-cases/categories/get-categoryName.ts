import { Category } from "@application/entities/category/category";
import { CategoryRepository } from "@application/repositories/category-repository";
import { Injectable } from "@nestjs/common";
import { CategoryNotFound } from "../errors/category-not-found";

interface GetCategoryNameRequest {
    categoryId: string;
}

@Injectable()
export class GetCategoryName {
    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    async execute(request: GetCategoryNameRequest): Promise<string | null> {
        const { categoryId } = request;

        const category = await this.categoryRepository.getCategoryName(categoryId);

        if (!category) throw CategoryNotFound;

        return category;
        

    }
}