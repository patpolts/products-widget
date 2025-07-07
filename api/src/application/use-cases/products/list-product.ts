import { ProductPagination } from "@application/entities/products/pagination";
import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface ListProductRequest{
    page?: number;
    limit?: number;
    categoryId?: string;
    order?: 'asc' | 'desc';
}

interface ListProductResponse {
    products: Product[];
    pagination?: ProductPagination;
}

@Injectable()
export class ListProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request?: ListProductRequest): Promise<ListProductResponse> {
        let pagination:ProductPagination | undefined;
        const categoryId = request?.categoryId;

        if(request?.page && request?.limit){
            pagination = new ProductPagination({
                page: request.page,
                limit: request.limit,
                total: 0
            });

            const totalProducts = await this.productRepository.countProducts(categoryId);
            pagination.total = totalProducts;
        }
        const products = await this.productRepository.getAll(pagination,categoryId,request?.order ?? 'desc');

        for(const p of products){
            const productSkus = await this.productRepository.getSkus(p.id);
            const productImages = await this.productRepository.getImages(p.id);

            if(productSkus.length > 0) p.skus = productSkus;
            if(productImages.length > 0) p.images = productImages;
        }

        return {
            products,
            pagination
        }

    }
}