import Address from "../value-object/address";
import Customer from "./customer"

describe("Customer uinit teste", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Super Aoba");
        }).toThrowError("customer: Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("customer: Name is required");
    });


    it("should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrowError("customer: Id is required,customer: Name is required");
    });


    it("should change name", () => {
        let customer = new Customer("123", "John");
        customer.changeName("Paul");
        expect(customer.name).toEqual("Paul");
    });

    it("should activate customer", () => {
        let customer = new Customer("123", "John");
        const address = new Address("Rua 2", 2, "12345-678", "São Paulo")
        customer.Address = address;
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer", () => {
        let customer = new Customer("123", "John");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw erro when address is undefined when you activate a customer", () => {
        expect(() => {
            let customer = new Customer("123", "John");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        let customer = new Customer("123", "John");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    })
})