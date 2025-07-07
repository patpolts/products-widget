
import { Injectable } from "@nestjs/common";
import { ProductNotFound } from "@application/use-cases/errors/product-not-found";
import { Category } from "@application/entities/category/category";
import { CategoryRepository } from "@application/repositories/category-repository";

type CategoryProductFields = {
    name?: string;
    descripition?: string;
    slug?: string;
    parentId?: string;
    isActive?: boolean;

}

interface CategoryProductRequest {
    categoryId: string;
    data: Partial<CategoryProductFields>;
}
interface CategoryProductResponse {
    category: Category;
}

@Injectable()
export class UpdateCategory {
    constructor(
        private categoryRepository: CategoryRepository
    ) { }

    async execute(request: CategoryProductRequest): Promise<CategoryProductResponse> {
        const { categoryId, data } = request;
        const category = await this.categoryRepository.get(categoryId);

        if (!category) throw new ProductNotFound;

        for(const [key, value] of Object.entries(data)){
            if(value !== undefined && key in category){
                (category as any)[key] = value;
            }
        }

        await this.categoryRepository.update(categoryId, data)

        return {
            category
        }

    }
}