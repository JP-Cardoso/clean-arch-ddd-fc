import Product from "./product";

describe("Product unit test", () => {

    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product("", "Product 1", 100)
        }).toThrowError("Id is required");
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product("1", "", 100)
        }).toThrowError("Name is required");
    });

    it('should throw error when price is less than zero', () => {
        expect(() => {
            const product = new Product("1", "Produto 1", 0)
        }).toThrowError("Price must be greater a zero");
    });

    it("should change name", () => {
        const product = new Product("1", "Produto", 10);
        expect(product.name).toBe("Produto");

        product.changeName("Produto Alterado");
        expect(product.name).toBe("Produto Alterado");
    });

    it("should change price", () => {
        const product = new Product("1", "Produto", 10);
        expect(product.price).toBe(10);
        
        product.changePrice(15);
        expect(product.price).toBe(15);
    });
})