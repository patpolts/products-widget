import { Replace } from '@helpers/Replace';
import { randomUUID } from 'node:crypto';
export interface ProductImageProps {
    productId: string;
    imageId?: string;
    skuId?: string;
    url: string;
    altText?: string;
    featured: boolean;
    position: number;
}

export class ProductImage {
    private readonly _id: string = randomUUID();
    private props: ProductImageProps;

    constructor(props: Replace<ProductImageProps,{
        imageId?: string;
        skuId?: string;
        altText?: string;
    }>, id?: string) {

        if(!props.productId.trim()) throw new Error('Product ID cannot be empty');
        if(!props.url.trim()) throw new Error('Image URL cannot be empty');
        if(props.imageId && props.skuId) throw new Error("A image can't be registered as both product and sku image");
        

        this._id = id ?? randomUUID();
        this.props = {
            ...props,
            imageId: props.imageId ?? undefined,
            skuId: props.skuId ?? undefined,
            altText: props.altText ?? '',
        };
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this.props.productId;
    }

    /**
     * Sets the product ID of the image and updates the updatedAt timestamp.
     * @param productId - The new product ID for the image.
     */
    set productId(productId: string) {
        this.props.productId = productId;
    }

    get imageId(): string | undefined {
        return this.props.imageId;
    }

    /**
     * Sets the image ID of the image.
     * @param imageId - The new image ID for the image.
     */
    set imageId(imageId: string | undefined) {
        this.props.imageId = imageId;
    }

    get skuId(): string | undefined {
        return this.props.skuId;
    }

    /**
     * Sets the SKU ID of the image.
     * @param skuId - The new SKU ID for the image.
     */
    set skuId(skuId: string | undefined) {
        this.props.skuId = skuId;
    }

    get url(): string {
        return this.props.url;
    }

    /**
     * Sets the URL of the image.
     * @param url - The new URL for the image.
     */
    set url(url: string) {
        this.props.url = url;
    }

    get altText(): string | undefined {
        return this.props.altText;
    }

    /**
     * Sets the alt text of the image.
     * @param altText - The new alt text for the image.
     */
    set altText(altText: string | undefined) {
        this.props.altText = altText;
    }

    get featured(): boolean {
        return this.props.featured;
    }

    /**
     * Sets whether the image is featured.
     * @param featured - Whether the image is featured.
     */
    set featured(featured: boolean) {
        this.props.featured = featured;
    }

    get position(): number {
        return this.props.position;
    }

    /**
     * Sets the position of the image.
     * @param position - The new position for the image.
     */
    set position(position: number) {
        this.props.position = position;
    }


}