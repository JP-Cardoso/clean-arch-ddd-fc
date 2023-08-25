import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.productRepository = repository;
    };

    async execute(entity: InputCreateProductDto):  Promise<OutputCreateProductDto>{
        const product = ProductFactory.create(entity.type, entity.name, entity.price);
        console.log(product);

        // await this.productRepository.create(product)
        return product
    }
}