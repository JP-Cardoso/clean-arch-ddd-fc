import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CreateCustomerEvent from "../create-customer.event";

export default class CreateCustomerHandler implements EventHandlerInterface<CreateCustomerEvent> {

    handle(event: CreateCustomerEvent): void {
        console.log(event);
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
        console.log("Esse é o segundo console.log do evento: CustomerCreated");

    }
}