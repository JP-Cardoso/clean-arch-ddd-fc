import express, { Request, Response } from "express";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import ListCustomerUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateCustomerUseCase(new CustomerRepository());
    try {
        const payload = { ...req.body };
        const customerDto = {
            name: payload.name,
            address: {
                street: payload.address.street,
                city: payload.address.city,
                number: payload.address.number,
                zip: payload.address.zip,
            }
        };
        const output = await useCase.execute(customerDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    };
});

customerRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListCustomerUseCase(new CustomerRepository());
    try {
        const output = await useCase.execute({});
        res.send(output)
    } catch (err) {
        res.status(500).send(err);
    }
})