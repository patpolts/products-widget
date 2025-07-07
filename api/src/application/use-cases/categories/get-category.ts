import { Category } from "@application/entities/category/category";
import { CategoryRepository } from "@application/repositories/category-repository";
import { Injectable } from "@nestjs/common";

interface GetCategoryRequest {
    categoryId?: string;
    slug?: string;
}
interface GetCategoryResponse {
    category: Category;
}

@Injectable()
export class GetCategory {
    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    async execute(request: GetCategoryRequest): Promise<GetCategoryResponse | null> {
        const { categoryId, slug } = request;
        const category = categoryId ? 
            await this.categoryRepository.get(categoryId) : 
                ( slug ? await this.categoryRepository.getBySlug(slug) : null);

        if (!category) return null;

        return {
            category
        }

    }
}