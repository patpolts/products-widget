import { ProductAttribute } from "./attribute";
import { ProductImage } from "./image";
import { Product } from "./product";
import { ProductReview } from "./review";
import { ProductSku } from "./sku";

describe('Product Entity', () => {
    it('should be able to create a product with valid properties', () => {
        const product = new Product({
            name: 'Test Product',
            slug: 'test-product',
            description: 'This is a test product.',
            categoryId: 'category-123',
            isActive: true,
        });

        expect(product).toBeTruthy();
        expect(product.createdAt).toBeInstanceOf(Date);
    });

    it('should be able to deactivate a product', () => {
        const product = new Product({
            name: 'Test Product',
            slug: 'test-product',
            description: 'This is a test product.',
            categoryId: 'category-123',
            isActive: true,
        });

        product.isActive = false;
        expect(product).toBeTruthy();
        expect(product.deletedAt).toBeInstanceOf(Date);
    });

    it('should throw an error if name is empty', () => {
        expect(() => {
            new Product({
                name: '',
                slug: 'test-product',
                description: 'This is a test product.',
                categoryId: 'category-123',
                isActive: true,
            });
        }).toThrow('Product name cannot be empty');
    });

    it('should throw an error if slug is empty', () => {
        expect(() => {
            new Product({
                name: 'Test Product',
                slug: '',
                description: 'This is a test product.',
                categoryId: 'category-123',
                isActive: true,
            });
        }).toThrow('Product slug cannot be empty');
    });

    it('should throw an error if description is empty', () => {
        expect(() => {
            new Product({
                name: 'Test Product',
                slug: 'test-product',
                description: '',
                categoryId: 'category-123',
                isActive: true,
            });
        }).toThrow('Product description cannot be empty');
    });


});