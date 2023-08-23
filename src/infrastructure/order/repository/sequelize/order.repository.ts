import Order from "../../../../domain/checkout/enity/order";
import OrderItem from "../../../../domain/checkout/enity/order_items";
import OrderRepositoryInterace from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";


export default class OrderRepository implements OrderRepositoryInterace {

  async update(entity: Order): Promise<void> {

    try {

      await OrderModel.update({
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity
        })),
        include: [{ model: OrderItemModel }],
      },
        {
          where: {
            id: entity.id
          },
        });
    } catch (error) {

    }

  }

  async findById(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        }, include: [{ model: OrderItemModel }],
        rejectOnEmpty: true
      });
    } catch (err) {
      throw new Error("Order not found");
    }

    let items = orderModel.items.map((itemModel) => {
      let item = new OrderItem(
        itemModel.id,
        itemModel.name,
        itemModel.price,
        itemModel.product_id,
        itemModel.quantity
      )
      return item;
    });

    return new Order(id, orderModel.customer_id, items)

  }

  async findAll(): Promise<Order[]> {
    const result = await OrderModel.findAll({ include: [{ model: OrderItemModel }], });
    const orderModel = result.map((orderModel) => {
      let items = orderModel.items.map((itemModel) => {
        let item = new OrderItem(
          itemModel.id,
          itemModel.name,
          itemModel.price,
          itemModel.product_id,
          itemModel.quantity
        )
        return item;
      });

      let order = new Order(orderModel.id, orderModel.customer_id, items);
      return order
    })
    return orderModel;
  }


  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
