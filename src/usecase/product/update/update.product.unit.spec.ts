import Product from "../../../domain/product/entity/product";
import {v4 as uuid} from 'uuid';
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product(uuid(), "Product 1", 25);

const input = {
    id: product.id,
    name: "Product Updated",
    price: 50
};

const MockRepository = () => {
    return {
        findAll: jest.fn(),
        findById: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Update product unit test",  () => {

    it("Update customer use case", async () => {
        const repoisoty = MockRepository();
        const useCase = new UpdateProductUseCase(repoisoty);

        const productUpdated = await useCase.execute(input);
        expect(productUpdated).toEqual(input)
    })
})