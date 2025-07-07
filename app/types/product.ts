export type PlaceHolderImage = { url: string;}

export interface ProductPagination{
    page: number;
    limit: number;
    total: number;
    lastPage: number;
}
export interface Product {
    id: string;
    name: string;
    description: string;
    slug?: string;
    category?: string;
    skus?: ProductSku[];
    images?: ProductImage[];
}

export interface ProductSku {
    id: string;
    productId: string;
    code: string;
    size?: string;
    color?: string;
    dimensions?: string;
    price: number;
    stock: number;
}

export interface ProductImage {
    id: string;
    productId: string;
    url: string;
    altText: string;
    featured: boolean;
    position: number;
}

export interface ProductListDTO{
    product: Product[],
    pagination: ProductPagination;
}
export interface ProductDTO{
    product: Product
}