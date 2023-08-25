import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";


export default class ProductRepository implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        })
    }

    async update(entity: Product): Promise<void> {

        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price
            },
            {
                where: {
                    id: entity.id
                }
            }
        );
    }

    async findById(id: string): Promise<Product> {
        let productModel
        try {
            productModel = await ProductModel.findOne({ where: { id: id } });
        } catch (error) {
            console.log(error);
            throw new Error("Product not found");
        }
        const product = new Product(productModel.id, productModel.name, productModel.price);
        return product;
        // return result.toJSON();
    }

    async findAll(): Promise<Product[]> {
        const result = await ProductModel.findAll();
        return result.map((productModel) =>
            new Product(productModel.id, productModel.name, productModel.price)
        )
    }

}