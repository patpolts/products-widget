import { Category } from "@application/entities/category/category";
import { CategoryRepository } from "@application/repositories/category-repository";
import { Injectable } from "@nestjs/common";

interface GetCategoriesResponse {
    categories: Category[];
}

@Injectable()
export class GetCategories {
    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    async execute(): Promise<GetCategoriesResponse> {
        const categories = await this.categoryRepository.getAll();

        return {
            categories
        }

    }
}