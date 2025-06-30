import { randomUUID } from 'node:crypto';

export interface ProductAttributeProps {
    productId: string;
    attributeId: string;
    value: string;
}

export class ProductAttribute {
    private readonly _id: string;
    private props: ProductAttributeProps;

    constructor(props: ProductAttributeProps,id?: string) {
        if(!props.value.trim()) throw new Error("Product attribute value cannot be empty");
        if(!props.productId.trim()) throw new Error("Product attribute productId cannot be empty");
        if(!props.attributeId.trim()) throw new Error("Product attribute attributeId cannot be empty");

        this._id = id ?? randomUUID();
        this.props = props;
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this.props.productId;
    }

    /**
     * Sets the product ID of the attribute and updates the updatedAt timestamp.
     * @param productId - The new product ID for the attribute.
     */
    set productId(productId: string) {
        this.props.productId = productId;
    }

    get attributeId(): string {
        return this.props.attributeId;
    }

    /**
     * Sets the attribute ID of the attribute.
     * @param attributeId - The new attribute ID for the attribute.
     */
    set attributeId(attributeId: string) {
        this.props.attributeId = attributeId;
    }

    get value(): string {
        return this.props.value;
    }

    /**
     * Sets the value of the attribute.
     * Throws an error if the value is empty or only contains whitespace.
     * @param newValue - The new value for the attribute.
     */
    set value(newValue: string) {
        this.props.value = newValue;
    }

}