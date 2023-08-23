import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import Customer from '../../../domain/customer/entity/customer';
import Address from '../../../domain/customer/value-object/address';
import FindCustomerUseCase from './find.customer.usecase';

describe("test find customer use case", () => {

    let sequelize: Sequelize
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([CustomerModel]);
        await sequelize.sync()
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const useCase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "João");
        const address = new Address("Rua dos Bobos", 123, "12345-678", "Por aí");
        customer.changeAddress(address);

        await customerRepository.create(customer);

        const input = { id: customer.id };
        const output = {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip
            }
        }
        const result = await useCase.execute(input);
        expect(result).toStrictEqual(output)
    })

})