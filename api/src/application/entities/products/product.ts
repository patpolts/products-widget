import { randomUUID } from 'node:crypto';
import { Replace } from "@helpers/Replace";
import { ProductSku } from './sku';
import { ProductImage } from './image';
import { ProductAttribute } from './attribute';

export interface ProductProps {
    name: string;
    description: string;
    slug: string;
    categoryId: string;
    skus?: ProductSku[];
    images?: ProductImage[];
    attributes?: ProductAttribute[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}

export class Product {
    private readonly _id: string;
    private props: ProductProps;

    constructor(
        props: Replace<ProductProps, {
            createdAt?: Date,
            updatedAt?: Date,
            deletedAt?: Date | null
        }>, id?: string
    ) {
        this._id = id ?? randomUUID();

        if(!props.name.trim()) throw new Error("Product name cannot be empty");
        if(!props.slug.trim()) throw new Error("Product slug cannot be empty");
        if(!props.description.trim()) throw new Error("Product description cannot be empty");
        
        this.props = {
            ...props,
            skus: props.skus ?? [],
            images: props.images ?? [],
            attributes: props.attributes ?? [],
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
            deletedAt: props.deletedAt ?? null,
        };

    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    /**
     * Sets the name of the product and updates the updatedAt timestamp.
     * @param name - The new name for the product.
     */
    set name(name: string) {
        this.props.name = name;
        this.touch();
    }

    get description(): string {
        return this.props.description;
    }

    /**
     * Sets the description of the product and updates the updatedAt timestamp.
     * @param description - The new description for the product.
     */
    set description(description: string) {
        this.props.description = description;
        this.touch();
        
    }

    get slug(): string {
        return this.props.slug;
    }

    /**
     * Sets the slug of the product and updates the updatedAt timestamp.
     * @param slug - The new slug for the product.
     */
    set slug(slug: string) {
        this.props.slug = slug;
        this.touch();
    }

    get categoryId(): string {
        return this.props.categoryId;
    }

    /**
     * Sets the category ID of the product and updates the updatedAt timestamp.
     * @param categoryId - The new category ID for the product.
     */
    set categoryId(categoryId: string) {
        this.props.categoryId = categoryId;
        this.touch();
    }

    get isActive(): boolean {
        return this.props.deletedAt === null;
    }

    /**
     * Sets the active status of the product.
     * If true, the product is active (deletedAt is set to null).
     * If false, the product is inactive (deletedAt is set to the current date).
     * @param value - True to activate the product, false to deactivate it.
     */
    set isActive(value: boolean) {
        this.props.deletedAt = value ? null : new Date();
        this.touch();
    }

    get skus(): ProductSku[] {
        return this.props.skus ?? [];
    }

    set skus(skus: ProductSku[]) {
        this.props.skus = skus;
        this.touch();

    }

    get images(): ProductImage[] {
        return this.props.images ?? []; 
    }

    set images(images: ProductImage[]) {
        this.props.images = images;
        this.touch();
    }

    get attributes(): ProductAttribute[] {
        return this.props.attributes ?? [];
    }

    set attributes(attributes: ProductAttribute[]) {
        this.props.attributes = attributes;
        this.touch();
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    get updatedAt(): Date {
        return this.props.updatedAt;
    }

    get deletedAt(): Date | null {
        return this.props.deletedAt ?? null;
    }

    /**
     * Sets the deletedAt timestamp, marking the product as inactive.
     * @param deletedAt - The date when the product was deleted, or null to reactivate it.
     */
    set deletedAt(date: Date | null) {
        this.props.deletedAt = date;
        this.touch();
    }

    private touch(){
        this.props.updatedAt = new Date();
    }
    
}