import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product1 = new Product("123,", "Poroduct 1", 25);

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product1)),
        update: jest.fn(),
        create: jest.fn(),
    }
};

describe("Unit Test find customer use case", () => {

    it("should find a product by id", async () => {
        const repository = MockRepository();
        const useCase = new FindProductUseCase(repository);

        const input = {
            id: product1.id
        }

        const output = {
            id: product1.id,
            name: product1.name,
            price: product1.price
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const repository = MockRepository();
        repository.findById.mockImplementation(() => {
            throw new Error("Product not found");
          });
        const useCase = new FindProductUseCase(repository);

        const input = {
            id: "1234"
        }

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");
    })
})