import { randomUUID } from 'node:crypto';
import { Replace } from "@helpers/Replace";
import { ProductImage } from "./image";

export interface ProductSkuProps {
    productId: string;
    code: string;
    size?: string;
    color?: string;
    dimensions?: string;
    price: number;
    stock: number;
    images: ProductImage[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

export class ProductSku {
    private readonly _id: string = randomUUID();
    private props: ProductSkuProps;

    constructor(props: Replace<ProductSkuProps,{
        images?: ProductImage[];
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date | null;
    }>,id?: string) {

        if (!props.productId.trim()) throw new Error("Product ID cannot be empty");
        if (!props.code.trim()) throw new Error("SKU code cannot be empty");
        if (props.price < 0) throw new Error("SKU price cannot be negative");
        if (props.stock < 0) throw new Error("SKU stock cannot be negative");
        
        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            images: props.images ?? [],
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            deletedAt: props.deletedAt ?? null,
        };
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this.props.productId;
    }

    /**
     * Sets the product ID of the SKU and updates the updatedAt timestamp.
     * @param productId - The new product ID for the SKU.
     */
    set productId(productId: string) {
        this.props.productId = productId;
    }

    get code(): string {
        return this.props.code;
    }

    /**
     * Sets the code of the SKU.
     * @param code - The new code for the SKU.
     */
    set code(code: string) {
        this.props.code = code;
    }

    get size(): string | undefined {
        return this.props.size;
    }

    /**
     * Sets the size of the SKU.
     * @param size - The new size for the SKU.
     */
    set size(size: string | undefined) {
        this.props.size = size;
    }

    get color(): string | undefined {
        return this.props.color;
    }

    /**
     * Sets the color of the SKU.
     * @param color - The new color for the SKU.
     */
    set color(color: string | undefined) {
        this.props.color = color;
    }

    get dimensions(): string | undefined {
        return this.props.dimensions;
    }

    /**
     * Sets the dimensions of the SKU.
     * @param dimensions - The new dimensions for the SKU.
     */
    set dimensions(dimensions: string | undefined) {
        this.props.dimensions = dimensions;
    }

    get price(): number {
        return this.props.price;
    }

    /**
     * Sets the price of the SKU.
     * @param price - The new price for the SKU.
     */
    set price(price: number) {
        this.props.price = price;
    }
    
    get stock(): number {
        return this.props.stock;
    }

    /**
     * Sets the stock of the SKU.
     * @param stock - The new stock for the SKU.
     */
    set stock(stock: number) {
        this.props.stock = stock;
    }

    get images(): ProductImage[] {
        return this.props.images;
    }

    /**
     * Sets the images of the SKU.
     * @param images - The new images for the SKU.
     */
    set images(images: ProductImage[]) {
        this.props.images = images;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

}