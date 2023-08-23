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
        const result = await ProductModel.findOne({ where: { id: id } });

        // return new Product(
        //     result.id,
        //     result.name,
        //     result.price
        // );

        return result.toJSON();
    }

    async findAll(): Promise<Product[]> {
        const result = await ProductModel.findAll();
        return result.map((productModel) =>
            new Product(productModel.id, productModel.name, productModel.price)
        )
    }

}