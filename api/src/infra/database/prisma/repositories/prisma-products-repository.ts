import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";
import { PrismaService } from "../prisma.service";
import { ProductAttribute } from "@application/entities/products/attribute";
import { ProductImage } from "@application/entities/products/image";
import { ProductSku } from "@application/entities/products/sku";
import { PrismaProductMapper } from "../mappers/prisma-product-mapper";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaProductSkuMapper } from "../mappers/prisma-product-sku-mapper";
import { PrismaProductImageMapper } from "../mappers/prisma-product-image-mapper";
import { PrismaProductSkuImageMapper } from "../mappers/prisma-product-sku-image-mapper";

@Injectable()
export class PrismaProductsRepository implements ProductRepository {
    constructor(
        private prismaService: PrismaService
    ) { }

    async getAll(): Promise<Product[]> {
        const products = await this.prismaService.product.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return products.map(PrismaProductMapper.toDomain);

    }

    async getById(id: string): Promise<Product | null> {
        const product = await this.prismaService.product.findUnique({
            where: {
                id
            }
        });

        if(!product) return null;

        return PrismaProductMapper.toDomain(product);
    }

    async getSkus(productId: string): Promise<ProductSku[]> {
        const skus = await this.prismaService.productSku.findMany({
            where: {
                productId,
                deletedAt: null
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return skus.map((sku) => PrismaProductSkuMapper.toDomain(sku));
    }

    async getImages(productId: string): Promise<ProductImage[]> {
        const images = await this.prismaService.productImage.findMany({
            where: {
                productId,
            },
            orderBy: {
                position: "asc"
            }
        });

        return images.map((img) => PrismaProductImageMapper.toDomain(img));
    }

    async getAttributes(productId: string): Promise<ProductAttribute[]> {
        const attributes = await this.prismaService.productAttribute.findMany({
            where: {
                productId,
            },
        });

        if (!attributes || attributes.length === 0) {
            return [];
        }

        return attributes.map(attribute => {
            return new ProductAttribute({
                productId: attribute.productId,
                attributeId: attribute.attributeId,
                value: attribute.value,
            }, attribute.id);
        });
    }

    async create(product: Product): Promise<void> {
        const raw = PrismaProductMapper.toPrisma(product);
        
        await this.prismaService.product.create({
            data: raw,
        });

    }

    async createSku(sku: ProductSku): Promise<void> {
        const raw = PrismaProductSkuMapper.toPrisma(sku);
        
        await this.prismaService.productSku.create({
            data: raw,
        });

    }

    async createImage(image: ProductImage): Promise<void> {
        if (image.skuId) {
            const raw = PrismaProductSkuImageMapper.toPrisma(image);
            await this.prismaService.productImageSku.create({
                data: {
                    ...raw,
                    sku: {
                        connect: { id: image.skuId }
                    }
                }
            });

        } else {
            const raw = PrismaProductImageMapper.toPrisma(image);

            await this.prismaService.productImage.create({
                data: raw
            });

        }
    }

    async createAttribute(attribute: ProductAttribute): Promise<void> {
        await this.prismaService.productAttribute.create({
            data: {
                productId: attribute.productId,
                attributeId: attribute.attributeId,
                value: attribute.value
            }
        });
        return;
    }

    async update(id: string, product: Partial<Prisma.ProductUpdateInput>): Promise<void> {

        await this.prismaService.product.update({
            where: {
                id: id
            },
            data: product
        });
    }

    
    /**
     * Marks a product as deleted by setting its `deletedAt` timestamp.
     *
     * @param id - The unique identifier of the product to be marked as deleted.
     * @returns A promise that resolves when the operation is complete.
     */
    async delete(id: string): Promise<void> {
        await this.prismaService.product.update({
            where: {
                id
            },
            data: {
                isActive: false,
                deletedAt: new Date()
            }
        });
    }

    async search(filters: any): Promise<Product[]> {
        const products = await this.prismaService.product.findMany({
            where: {
                deletedAt: null,
                ...filters
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return products.map(product => {
            return new Product({
                name: product.name,
                description: product.description,
                slug: product.slug,
                categoryId: product.categoryId,
                isActive: product.isActive,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt
            }, product.id);
        });

    }
}