import { randomUUID } from 'node:crypto';

export type AttributeType = 'text' | 'number' | 'boolean' | 'date';

export interface CategoryAttributesProps {
    categoryId: string;
    name: string;
    type: AttributeType;
}

export class CategoryAttribute {
    private readonly _id: string = randomUUID();
    private props: CategoryAttributesProps;

    constructor(props: CategoryAttributesProps,id?: string) {
        if (!props.categoryId.trim()) throw new Error("Category ID cannot be empty");
        if (!props.name.trim()) throw new Error("Category attribute name cannot be empty");
        
        const validTypes: AttributeType[] = ['text', 'number', 'boolean', 'date'];
        if (!validTypes.includes(props.type)) {
            throw new Error(`Invalid category attribute type: ${props.type}. Valid types are: ${validTypes.join(', ')}`);
        }

        this._id = id ?? randomUUID();
        this.props = props;
    }

    get id(): string {
        return this._id;
    }

    get categoryId(): string {
        return this.props.categoryId;
    }

    /**
     * Sets the category ID of the attribute and updates the updatedAt timestamp.
     * @param categoryId - The new category ID for the attribute.
     */
    set categoryId(categoryId: string) {
        this
    }

    get name(): string {
        return this.props.name;
    }

    /**
     * Sets the name of the attribute.
     * Throws an error if the name is empty or only contains whitespace.
     * @param name - The new name for the attribute.
     */
    set name(name: string) {
        this.props.name = name;
    }

    get type(): AttributeType {
        return this.props.type;
    }

    /**
     * Sets the type of the attribute.
     * Throws an error if the type is not one of the valid types.
     * @param type - The new type for the attribute.
     */
    set type(type: AttributeType) {
        this.props.type = type;
    }
}