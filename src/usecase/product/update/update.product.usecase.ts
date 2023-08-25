import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.productRepository = repository
    };

    async execute(entity: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.findById(entity.id);
        product.changeName(entity.name);
        product.changePrice(entity.price);

        await this.productRepository.update(product);

        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
        }
    }
} 