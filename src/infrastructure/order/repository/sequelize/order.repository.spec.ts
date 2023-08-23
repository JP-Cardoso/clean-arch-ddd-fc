import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import OrderRepository from "./order.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import Order from "../../../../domain/checkout/enity/order";
import OrderItem from "../../../../domain/checkout/enity/order_items";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderModel from "./order.model";
import { v4 as uuid } from 'uuid'

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new Order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123456, "ZipCode", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 15);
    await productRepository.create(product);

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);

    const order = new Order("order-id-1", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });
    expect(orderModel.toJSON()).toStrictEqual({
      id: "order-id-1",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          product_id: orderItem.productId,
          quantity: orderItem.quantity,
          order_id: "order-id-1",
        }
      ]
    })
  });

  it("should find all order", async () => {

    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Street 1", 123456, "ZipCode", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 15);
    await productRepository.create(product);
    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2);
    const order = new Order("order-id-1", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const customer2 = new Customer("1234", "João");
    const address2 = new Address("Street 2", 123456, "ZipCode", "City 2");
    customer2.changeAddress(address2);
    await customerRepository.create(customer2);

    const product2 = new Product("11234", "Product 2", 30);
    await productRepository.create(product2);

    const orderItem2 = new OrderItem("11234", product2.name, product2.price, product2.id, 5);
    const order2 = new Order("order-id-2", "123", [orderItem2]);
    await orderRepository.create(order2)
    //Persisto a order

    const result = await orderRepository.findAll();
    expect(result).toHaveLength(2);
    expect(result).toContainEqual(order);
    expect(result).toContainEqual(order2);
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "John Doe");
    const address = new Address("Rua dos Bobos", 1234, "ZipCode", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 25);
    await productRepository.create(product);

    const orderItem = new OrderItem(uuid(), product.name, product.price, product.id, 2);
    const order = new Order(uuid(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    const orderResult = await orderRepository.findById(order.id);

    expect(order).toStrictEqual(orderResult);

  });

  it("should update a order by customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John Doe");
    const address = new Address("Rua dos Bobos", 1234, "ZipCode", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("254", "Product 1", 25);
    await productRepository.create(product);

    const orderItem = new OrderItem("244", product.name, product.price, product.id, 2);
    const order = new Order("236", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.changeCustomer("1234");
    orderRepository.update(order)
    const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] });   
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order_id: order.id,
        product_id: product.id,
      }]
    })

  })

});
