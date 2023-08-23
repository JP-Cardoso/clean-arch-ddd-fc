import Order from "./order";
import OrderItem from "./order_items";

describe("Order unit test", () => {

    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required")
    });

    it("should throw error when customerID is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("customerId is required")
    });

    it("should throw error when ordem items is empty", () => {
        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrowError("Items are required")
    });

    it("should calculate total", () => {

        let item1 = new OrderItem("1", "Item1", 45, "p1", 1);
        let item2 = new OrderItem("2", "Item2", 30, "p1", 2);

        const ordem = new Order("1", "123", [item1]);
        let result = ordem.total();
        expect(result).toBe(45);

        const item = new Order("1", "123", [item1, item2]);
        result = item.total();
        expect(result).toBe(105);
    });

    it("should throw error if the item qtd is less or equal zero", () => {
        expect(() => {
            let item = new OrderItem("i1", "Item 1", 100, "p1", 0);
            let order = new Order("o1", "c1", [item]);

        }).toThrowError("Quantity must be greater than zero");
    })
})