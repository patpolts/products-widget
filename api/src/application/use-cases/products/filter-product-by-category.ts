import { ProductPagination } from "@application/entities/products/pagination";
import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";

interface FilterProductByCategorytRequest{
    categoryId: string;
}

interface FilterProductByCategorytResponse {
    products: Product[];
}

@Injectable()
export class FilterProductByCategory {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: FilterProductByCategorytRequest): Promise<FilterProductByCategorytResponse> {
        const {categoryId} = request;
        const products = await this.productRepository.getByCategoryId(categoryId);

        for(const p of products){
            const productSkus = await this.productRepository.getSkus(p.id);
            const productImages = await this.productRepository.getImages(p.id);

            if(productSkus.length > 0) p.skus = productSkus;
            if(productImages.length > 0) p.images = productImages;
        }

        return {
            products
        }

    }
}