import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.productRepository = repository;
    };

    async execute(data: InputFindProductDto): Promise<OutputFindProductDto> {
        const output = await this.productRepository.findById(data.id);
        console.log(output);
        
        return {
            id: output.id,
            name: output.name,
            price: output.price,
        }
    }
}