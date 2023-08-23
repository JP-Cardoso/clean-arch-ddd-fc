import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

    it("should create a new customer", () => {
        let customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with an address", () => {
        const address = new Address("Dos Bobos", 1345, "1234-567", "Dos Palermas");
        let customer = CustomerFactory.createWithAddress("John", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toEqual("John");
        expect(customer.Address).toBe(address);
    })
})