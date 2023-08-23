import SendEmailWhenProductIsCreatedHandler from "../../product/events/handler/sendEmailWhenProductIscreated.handler";
import ProductCreatedEvent from "../../product/events/product-created.event";
import EventDispatcher from "./event.dispatcher";

describe("Domain event tests", () => {

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    });

    it('should unregister an event handelr', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("Product-Event-Created", eventHandler);
        expect(eventDispatcher.getEventHandlers['Product-Event-Created'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("Product-Event-Created", eventHandler);
        expect(eventDispatcher.getEventHandlers['Product-Event-Created']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['Product-Event-Created'].length).toBe(0);
    });

    it('should unregisterAll an event handelr', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventhandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product-1",
            description: "Product-1 Description",
            price: 10
        })

        //Quando o notify for execuatdo o sandemail....handler() deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventhandler).toHaveBeenCalled()
    })
})