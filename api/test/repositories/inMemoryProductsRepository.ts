import { Product } from "@application/entities/products/product";
import { ProductRepository } from "@application/repositories/product-repository";

export class InMemoryProductsRepository  implements ProductRepository{
    public products: Product[] = [];

    async getAll(): Promise<Product[]> {
        return this.products;
    }

    async getById(id: string): Promise<Product | null> {
        const product = this.products.find(product => product.id === id);
        return product || null;
    }

    async create(product: Product): Promise<void> {
        this.products.push(product);
    }

    async update(product: Product): Promise<void> {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
            this.products[index] = product;
        } else {
            throw new Error("Product not found");
        }
    }

    async delete(id: string): Promise<void> {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
        } else {
            throw new Error("Product not found");
        }
    }

    async search(filters: any): Promise<Product[]> {
        return this.products.filter(product => {
            return Object.keys(filters).every(key => {
                return product[key] === filters[key];
            });
        });
    }
    
}