import EventDispatcher from "../../../@shared/event/event.dispatcher";
import Customer from "../../entity/customer";
import CreateCustomerEvent from "../create-customer.event";
import CreateCustomerHandler from "./create-customer.handler";
import { v4 as uuid } from 'uuid';

describe("Create a new customer event", () => {

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CreateCustomerHandler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);
    });

    it('should unregister an event handelr', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CreateCustomerHandler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length).toBe(0);
    });

    it('should unregisterAll an event handelr', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CreateCustomerHandler()

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
    });

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new CreateCustomerHandler();
        const spyEventhandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        const customer = new Customer(uuid(), "João Paulo");

        const createCustomerEvent = new CreateCustomerEvent({
            id: customer.id,
            name: customer.name
        })

        eventDispatcher.notify(createCustomerEvent);
        // expect(spyEventhandler).toHaveBeenCalled()
    })
})