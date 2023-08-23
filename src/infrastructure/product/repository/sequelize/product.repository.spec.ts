import { Sequelize } from "sequelize-typescript"
import ProductRepository from "./product.repository";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";

describe("Product repository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        //diz ao sequelize que esse model existe
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close()
    });

    it("should create a product", async () => {
        const productReposiory = new ProductRepository();

        const product = new Product("product-1-id", "Produto 1", 25);
        await productReposiory.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "product-1-id" } });

        expect(productModel.toJSON()).toStrictEqual(
            {
                id: "product-1-id",
                name: "Produto 1",
                price: 25
            }
        );
    });

    it("should update a product", async () => {
        const productReposiory = new ProductRepository();

        const product = new Product("product-1-id", "Produto 1", 25);
        await productReposiory.create(product);

        product.changeName("Produto Atualizado");
        product.changePrice(500)

        await productReposiory.update(product);

        const productModel = await ProductModel.findOne({ where: { id: "product-1-id" } });

        expect(productModel.toJSON()).toStrictEqual(
            {
                id: "product-1-id",
                name: "Produto Atualizado",
                price: 500
            }
        );
    });

    it("should find a product", async () => {
        const productReposiory = new ProductRepository();

        const product = new Product("product-1-id", "Produto 1", 25);
        await productReposiory.create(product);

        const productModel = await ProductModel.findOne({ where: { id: "product-1-id" } });

        const foundProduct = await productReposiory.findById(product.id);

        expect(productModel.toJSON()).toStrictEqual(
            {
                id: foundProduct.id,
                name: foundProduct.name,
                price: foundProduct.price
            }
        );
    })

    it("should find all products", async () => {
        const productReposiory = new ProductRepository();

        const product = new Product("product-1-id", "Produto 1", 25);
        await productReposiory.create(product);

        const product2 = new Product("product-2-id", "Produto 2", 25);
        await productReposiory.create(product2);

        const foundProduct = await productReposiory.findAll();
        const products = [product, product2];

        expect(products).toEqual(foundProduct);

    })

})