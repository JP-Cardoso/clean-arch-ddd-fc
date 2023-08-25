import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(repository: ProductRepositoryInterface) {
        this.productRepository = repository
    };

    async execute(data: InputListProductDto): Promise<OutputListProductDto> {
        const products = await this.productRepository.findAll();
        
        return OutputMapper.toOutput(products)
    }
};

class OutputMapper {
    static toOutput(product: Product[]): OutputListProductDto {
        return {
            product: product.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price, 
            })),
        };
    }
}