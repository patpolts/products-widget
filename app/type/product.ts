import type { ProductImage } from "./product-image";
import type { ProductSku } from "./product-sku";

export interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    category: string;
    skus: ProductSku[];
    images: ProductImage[];
}