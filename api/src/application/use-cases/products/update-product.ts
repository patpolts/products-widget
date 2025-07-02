import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { Injectable } from "@nestjs/common";
import { ProductNotFound } from "@application/use-cases/errors/product-not-found";

type UpdateProductFields = {
    name?: string;
    descripition?: string;
    slug?: string;
    categoryId?: string;
    deletedAt?: Date | null;

}

interface UpdateProductRequest {
    productId: string;
    data: Partial<UpdateProductFields>;
}
interface UpdateProductResponse {
    product: Product;
}

@Injectable()
export class UpdateProduct {
    constructor(
        private productRepository: ProductRepository
    ) { }

    async execute(request: UpdateProductRequest): Promise<UpdateProductResponse> {
        const { productId, data } = request;
        const product = await this.productRepository.getById(productId);

        if (!product) throw new ProductNotFound;

        //update product entity dinamically with request fields updated
        for(const [key, value] of Object.entries(data)){
            if(value !== undefined && key in product){
                (product as any)[key] = value;
            }
        }

        await this.productRepository.update(productId, data)

        return {
            product
        }

    }
}