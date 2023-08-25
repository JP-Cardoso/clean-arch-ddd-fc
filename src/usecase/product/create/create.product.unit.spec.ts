import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: "A",
    id: "123",
    name: "Product 1",
    price: 25
};

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("unit test create product use case", () => {


    it('should crate a new product ', async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);
        console.log(output);
        
    })
})