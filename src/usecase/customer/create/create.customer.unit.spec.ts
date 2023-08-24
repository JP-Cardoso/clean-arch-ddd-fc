import CreaterCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John",
    address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
    },
}

const MockRepository = () => {
    return {
        findById: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("unit test create customer use case", () => {

    it("should create a customer", async () => {
        const customerRepository = MockRepository();
        const customerUseCase = new CreaterCustomerUseCase(customerRepository);

        const output = await customerUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                city: input.address.city,
                number: input.address.number,
                zip: input.address.zip,
            },
        })
    });

    it("should throw an error when name is missing", async () => {
        const customerRepository = MockRepository();
        const customerUseCase = new CreaterCustomerUseCase(customerRepository);
        input.name = "";

        await expect(customerUseCase.execute(input)).rejects.toThrow("Name is required");
   })
})