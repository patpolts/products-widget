import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateProductBody } from "@infra/http/dtos/create-product-body";
import { CreateProductSkuBody } from "../dtos/create-product-sku-body";
import { CreateProductImageBody } from "../dtos/create-product-image-body";
import { ProductImage } from "@application/entities/products/image";
import { ProductViewModel } from "../view-models/product-view-model";
import { UpdateProductBody } from "../dtos/update-product-body";
import { UpdateProduct } from "@application/use-cases/products/update-product";
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Product } from "@application/entities/products/product";
import { GetCategory } from "@application/use-cases/categories/get-category";
import { AddCategory } from "@application/use-cases/categories/add-category";
import { GetCategories } from "@application/use-cases/categories/get-categories";
import { CategoryViewModel } from "../view-models/category-view-model";
import { Category } from "@application/entities/category/category";
import { CreateCategoryBody } from "../dtos/create-category-body";
import { UpdateCategoryBody } from "../dtos/update-category-body";
import { UpdateCategory } from "@application/use-cases/categories/update-category";
import { GetCategoryName } from "@application/use-cases/categories/get-categoryName";

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
    constructor(
        private getCategory: GetCategory,
        private getCategoryName: GetCategoryName,
        private getCategories: GetCategories,
        private addCategory: AddCategory,
        private updateCategory: UpdateCategory,
    ) { }

    @Get()
    @ApiOperation({ summary: 'List of active categories' })
    @ApiOkResponse({
        description: 'Categories list or empty array.',
        schema: {
            example: {
                "category": [
                    {
                        "id": "f8fcf5c5-c48e-49d2-9c56-3e4651fd0beb",
                        "name": "Category Test",
                        "description": "This is a test category",
                        "slug": "category-test",
                        "category": "168a5894-25c0-4d4c-97cb-2343ec86dca8",
                    }
                ]
            }
        }
    })
    async list() {
        const { categories } = await this.getCategories.execute();

        return {
            categories: categories.map((categpry) => CategoryViewModel.toHttp(categpry)),
        }
    }

    @ApiOperation({ summary: 'Get a category details by ID.' })
    @ApiResponse({ status: 200, description: 'Success: Category details.' })
    @ApiResponse({ status: 404, description: 'Error: Category not found.' })
    @Get(':id')
    async categoryDetail(@Param('id') id: string) {
        const response = await this.getCategory.execute({ categoryId: id });

        if (!response || !response.category) {
            return null;
        }

        return {
            category: CategoryViewModel.toHttp(response.category)
        }
    }
    
    @ApiOperation({ summary: 'Get a category name by ID.' })
    @ApiResponse({ status: 200, description: 'String: Category name.' })
    @ApiResponse({ status: 404, description: 'Error: Category not found.' })
    @Get('name/:id')
    async categoryName(@Param('id') id: string) {
        const response = await this.getCategoryName.execute({ categoryId: id });

        return response;
    }

    @ApiOperation({ summary: 'Get a category details by slug.' })
    @ApiResponse({ status: 200, description: 'Success: category details.' })
    @ApiResponse({ status: 404, description: 'Error: category not found.' })
    @Get('slug/:slug')
    async productDetailBySlug(@Param('slug') slug: string) {
        const response = await this.getCategory.execute({ slug });

        if (!response || !response.category) {
            return {
                category: null
            };
        }

        return {
            category: CategoryViewModel.toHttp(response.category)
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create a category.' })
    @ApiResponse({ status: 201, description: 'category created.' })
    @ApiCreatedResponse({
        description: 'The category has been successfully  created.',
        type: Category
    })
    async create(@Body() body: CreateCategoryBody) {
        const { name, description, slug, parentId, isActive } = body;
        const { category } = await this.addCategory.execute({
            name,
            description,
            slug,
            parentId,
            isActive,
        });

        return {
            category: CategoryViewModel.toHttp(category),
        };
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a category.' })
    @ApiResponse({ status: 201, description: 'category updated.' })
    @ApiResponse({ status: 404, description: 'category to update not found.' })
    async categoryUpdate(@Param('id') id: string, @Body() body: UpdateCategoryBody) {
        const { category } = await this.updateCategory.execute({ categoryId: id, data: body });

        return CategoryViewModel.toHttp(category);
    }
}