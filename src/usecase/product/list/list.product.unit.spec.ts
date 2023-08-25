import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create("A", "Poroduct 1", 25);
const product2 = ProductFactory.create("A", "Poroduct 2", 25);

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        findById: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("unit test find all use case", () => {

    it("should find all products", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);

        const outputs = await useCase.execute({});
        expect(outputs.product.length).toBe(2);
        expect(outputs.product[0].id).toBe(product1.id);
        expect(outputs.product[0].name).toBe(product1.name);
        expect(outputs.product[0].price).toBe(product1.price);
        expect(outputs.product[1].id).toBe(product2.id);
        expect(outputs.product[1].name).toBe(product2.name);
        expect(outputs.product[1].price).toBe(product2.price);
    })
})