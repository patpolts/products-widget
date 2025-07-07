import { ProductAttribute } from "@application/entities/products/attribute";
import { ProductImage } from "@application/entities/products/image";
import { ProductPagination } from "@application/entities/products/pagination";
import { Product } from "@application/entities/products/product";
import { ProductSku } from "@application/entities/products/sku";
import { Prisma } from "@prisma/client";

export abstract class ProductRepository {
    abstract getAll(paginate?:ProductPagination,categoryId?:string, order?: string): Promise<Product[]>;
    abstract getSkus(productId: string): Promise<ProductSku[]>;
    abstract getImages(productId: string): Promise<ProductImage[]>;
    abstract getAttributes(productId: string): Promise<ProductAttribute[]>;
    abstract getById(id: string): Promise<Product | null>;
    abstract getByCategoryId(categoryId: string): Promise<Product[]>;
    abstract getBySlug(slug: string): Promise<Product | null>;
    abstract countProducts(categoryId?:string): Promise<number>;
    abstract create(product: Product): Promise<void>;
    abstract createSku(sku: ProductSku): Promise<void>;
    abstract createImage(image: ProductImage): Promise<void>;
    abstract createAttribute(attribute: ProductAttribute): Promise<void>;
    abstract update(id: string, product: Partial<Prisma.ProductUpdateInput>): Promise<void>;
    abstract delete(id: string): Promise<void>;
    abstract search(filters: any): Promise<Product[]>;
}