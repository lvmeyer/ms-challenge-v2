import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category, CreateCategoryRequest, Product } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductRequest, UpdateProductRequest } from '@app/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  sayHello(): string {
    return 'Hello World!';
  }

  // ==========================================
  // ================== CATEGORIES ============
  // ==========================================
  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<any> {
    try {
      console.log('PDT CATEG SERVICE');
      return await this.categoryRepository.save(createCategoryRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async deleteCategory(uuid: string): Promise<any> {
    const category = await this.categoryRepository.findOneBy({ id: uuid });
    if (!category) {
      throw new NotFoundException('Category not found for deletion');
    }

    await this.categoryRepository.remove(category);
  }

  // ==========================================
  // ================== PDTS ==================
  // ==========================================
  async createProduct(
    createProductRequest: CreateProductRequest,
  ): Promise<any> {
    try {
      return await this.productRepository.save(createProductRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async find(uuid: string): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id: uuid });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(
    uuid: string,
    updateProductRequest: UpdateProductRequest,
  ): Promise<any> {
    try {
      const product = await this.productRepository.findOneBy({ id: uuid });
      if (!product) {
        throw new NotFoundException('Product not found for update');
      }
      return await this.productRepository.update(uuid, updateProductRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const product = await this.productRepository.findOneBy({ id: uuid });
    if (!product) {
      throw new NotFoundException('Product not found for deletion');
    }

    await this.productRepository.remove(product);
  }

  // ==========================================
  // ================== SEED ==================
  // ==========================================
  public async seed() {
    await this.productRepository.delete({});
    await this.categoryRepository.delete({});

    const gpu = await this.categoryRepository.insert({
      name: 'Graphics Cards',
    });

    const gc = await this.categoryRepository.insert({
      name: 'Motherboards',
    });

    const processor = await this.categoryRepository.insert({
      name: 'Processors',
    });

    const memory = await this.categoryRepository.insert({
      name: 'Memory',
    });

    await this.productRepository.insert({
      name: 'ASRock AMD Radeon RX 6600',
      description: 'ASRock AMD Radeon RX 6600',
      price: 229,
      category: gpu.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASRock AMD Radeon RX 6700',
      description: 'ASRock AMD Radeon RX 6700',
      price: 399,
      category: gpu.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASRock AMD Radeon RX 7600',
      description: 'ASRock AMD Radeon RX 7600',
      price: 350,
      category: gpu.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASUS DUAL GeForce RTX 3060',
      description: 'ASUS DUAL GeForce RTX 3060',
      price: 369,
      category: gpu.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASUS TUF GAMING B550-PLUS',
      description: 'ASUS TUF GAMING B550-PLUS',
      price: 159,
      category: gc.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASUS TUF GAMING B550M-PLUS',
      description: 'ASUS TUF GAMING B550M-PLUS',
      price: 129,
      category: gc.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASUS ROG Strix B550-F',
      description: 'ASUS ROG Strix B550-F',
      price: 189,

      category: gc.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'ASUS ROG Strix B550-E',
      description: 'ASUS ROG Strix B550-E',
      price: 259,
      category: gc.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'AMD Ryzen 5 5600X',
      description: 'AMD Ryzen 5 5600X',
      price: 299,
      category: processor.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'AMD Ryzen 7 5800X',
      description: 'AMD Ryzen 7 5800X',
      price: 449,
      category: processor.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'AMD Ryzen 9 5900X',
      description: 'AMD Ryzen 9 5900X',
      price: 549,
      category: processor.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'Corsair Vengeance LPX 16GB',
      description: 'Corsair Vengeance LPX 16GB',
      price: 89,
      category: memory.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'Corsair Vengeance LPX 32GB',
      description: 'Corsair Vengeance LPX 32GB',
      price: 169,
      category: memory.identifiers[0],
    });

    await this.productRepository.insert({
      name: 'Corsair Vengeance LPX 64GB',
      description: 'Corsair Vengeance LPX 64GB',
      price: 299,
      category: memory.identifiers[0],
    });
  }
}
