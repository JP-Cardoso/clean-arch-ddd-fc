import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {

    it("should create a product type a", () => {
        const product = ProductFactory.create("A", "Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product")
    });

    it("should create a product type b", () => {
        const product = ProductFactory.create("B", "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.name).toEqual("Product B");
        expect(product.price).toBe(2);
        expect(product.constructor.name).toBe("ProductB");
    });

    it("should throw error when the product type is not defined", () => {
        expect(() => {
            const product = ProductFactory.create("C", "Product C", 1);
        }).toThrowError("Product type not supported")
    });
})