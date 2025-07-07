import { Injectable } from "@nestjs/common";
import { Category } from "@application/entities/category/category";
import { CategoryRepository } from "@application/repositories/category-repository";

interface AddCategoryRequest {
    name: string;
    description?: string;
    slug: string;
    parentId?: string;
    isActive: boolean;
}

interface AddCategoryResponse {
    category: Category;
}

@Injectable()
export class AddCategory {
    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    async execute(
        request: AddCategoryRequest
    ): Promise<AddCategoryResponse> {
        const { name, description, slug, parentId, isActive } = request;

        const category = new Category({
            name,
            slug,
            description,
            parentId,
            isActive
        });
        
        await this.categoryRepository.create(category);

        return {
            category
        }

    }
}