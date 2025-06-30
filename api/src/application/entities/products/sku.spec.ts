import { ProductSku } from "./sku";

describe('Sku Entity', () => {
    it('should be able to create a SKU with valid properties', () => {
        const sku = new ProductSku({
            productId: 'product-123',
            code: 'SKU-001',
            size: 'M',
            color: 'Red',
            dimensions: '10x10x10',
            price: 29.99,
            stock: 100,
        });

        expect(sku).toBeTruthy();
        expect(sku.createdAt).toBeInstanceOf(Date);
    });

    it('should throw an error if productId is empty', () => {
        expect(() => {
            new ProductSku({
                productId: '',
                code: 'SKU-001',
                size: 'M',
                color: 'Red',
                dimensions: '10x10x10',
                price: 29.99,
                stock: 100,
            });
        }).toThrow('Product ID cannot be empty');
    });

    it('should throw an error if code is empty', () => {
        expect(() => {
            new ProductSku({
                productId: 'product-123',
                code: '',
                size: 'M',
                color: 'Red',
                dimensions: '10x10x10',
                price: 29.99,
                stock: 100,
            });
        }).toThrow('SKU code cannot be empty');
    });

    it('should throw an error if price is negative', () => {
        expect(() => {
            new ProductSku({
                productId: 'product-123',
                code: 'SkU-001',
                size: 'M',
                color: 'Red',
                dimensions: '10x10x10',
                price: -1,
                stock: 100,
            });
        }).toThrow('SKU price cannot be negative');
    });

    it('should throw an error if stock is negative', () => {
        expect(() => {
            new ProductSku({
                productId: 'product-123',
                code: 'SkU-001',
                size: 'M',
                color: 'Red',
                dimensions: '10x10x10',
                price: 100,
                stock: -1,
            });
        }).toThrow('SKU stock cannot be negative');
    });

});