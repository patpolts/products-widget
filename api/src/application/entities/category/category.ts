import { randomUUID } from 'node:crypto';
import { CategoryAttribute } from "./attribute";
import { Replace } from '@helpers/Replace';

export interface CategoryProps {
    name: string;
    slug: string;
    description?: string | null;
    parentId?: string | null;
    isActive: boolean;
    attributes?: CategoryAttribute[]; 
    createdAt: Date;
}

export class Category {
    private readonly _id: string;
    private props: CategoryProps;

    constructor(props: Replace<CategoryProps, {
        createdAt: Date;
        attributes?: CategoryAttribute[];
        parentId?: string | null;
        description?: string | null;
    }>,id?: string) {
        if (!props.name.trim()) throw new Error("Category name cannot be empty");
        if (!props.slug.trim()) throw new Error("Category slug cannot be empty");
        
        this._id = id ?? randomUUID();
        this.props = props;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this.props.name;
    }

    /**
     * Sets the name of the category.
     * Throws an error if the name is empty or only contains whitespace.
     * @param name - The new name for the category.
     */
    set name(name: string) {
        if (!name.trim()) throw new Error("Category name cannot be empty");
        this.props.name = name;
    }
    
    get slug(): string {
        return this.props.slug;
    }

    /**
     * Sets the slug of the category.
     * Throws an error if the slug is empty or only contains whitespace.
     * @param slug - The new slug for the category.
     */
    set slug(slug: string) {
        this.props.slug = slug;
    }

    get description(): string | null | undefined {
        return this.props.description;
    }

    /**
     * Sets the description of the category.
     * @param description - The new description for the category.
     */
    set description(description: string | null | undefined) {
        this.props.description = description;
    }

    get parentId(): string | null | undefined {
        return this.props.parentId;
    }

    /**
     * Sets the parent ID of the category.
     * @param parentId - The new parent ID for the category.
     */
    set parentId(parentId: string | null | undefined) {
        this.props.parentId = parentId;
    }

    get isActive(): boolean {
        return this.props.isActive;
    }

    /**
     * Sets the active status of the category.
     * @param value - True to activate the category, false to deactivate it.
     */
    set isActive(value: boolean) {
        this.props.isActive = value;
    }

    get attributes(): CategoryAttribute[] {
        return this.props.attributes ?? [];
    }
    
    get createdAt(): Date {
        return this.props.createdAt;
    }
}