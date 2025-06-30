import { Replace } from "@helpers/Replace";

export interface ProductReviewProps {
    productId: string;
    rating: number;
    comment: string;
    author: string;
    createdAt: Date;
}

export class ProductReview {
    private props: ProductReviewProps;

    constructor(props: Replace<ProductReviewProps, {createdAt?: Date}>) {

        if (!props.productId.trim()) throw new Error("Product ID cannot be empty");
        if( props.rating < 1 || props.rating > 5) throw new Error("Rating must be between 1 and 5");
        if (!props.comment.trim()) throw new Error("Comment cannot be empty");
        if (!props.author.trim()) throw new Error("Author cannot be empty");

        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
        };

    }

    get productId(): string {
        return this.props.productId;
    }

    /**
     * Sets the product ID of the review.
     * @param productId - The new product ID for the review.
     */
    set productId(productId: string) {
        this.props.productId = productId;
    }
    
    get rating(): number {
        return this.props.rating;
    }

    /**
     * Sets the rating of the review.
     * Throws an error if the rating is not between 1 and 5.
     * @param rating - The new rating for the review.
     */
    set rating(rating: number) {
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }
        this.props.rating = rating;
    }

    get comment(): string {
        return this.props.comment;
    }
    
    /**
     * Sets the comment of the review.
     * @param comment - The new comment for the review.
     */
    set comment(comment: string) {
        this.props.comment = comment;
    }

    get author(): string {
        return this.props.author;
    }

    /**
     * Sets the author of the review.
     * @param author - The new author for the review.
     */
    set author(author: string) {
        this.props.author = author;
    }
    
    get createdAt(): Date {
        return this.props.createdAt;
    }

}