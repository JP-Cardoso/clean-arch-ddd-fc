import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';
describe("Order factory unit tests", () => {

    it("should create a new order", () => {
        //definindo a estrutura que eu quero passar para a minha factory
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "Product 1",
                    productId: uuid(),
                    quantity: 1,
                    price: 100,
                }
            ]
        }

        const order = OrderFactory.create(orderProps);
       
        expect(order.id).toBeDefined();
        expect(order.id).toEqual(orderProps.id);
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toBe(1);
    });
});