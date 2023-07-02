import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Category, CreateCategoryRequest, Product } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { CreateProductRequest, UpdateProductRequest } from '@app/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // ==========================================
  // ================== CATEGORIES ============
  // ==========================================
  async createCategory(
    createCategoryRequest: CreateCategoryRequest,
  ): Promise<CreateCategoryRequest & Category> {
    try {
      return await this.categoryRepository.save(createCategoryRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async deleteCategory(uuid: string): Promise<void> {
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
  ): Promise<CreateProductRequest & Product> {
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
  ): Promise<UpdateResult> {
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

  async delete(uuid: string): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: uuid });
    if (!product) {
      throw new NotFoundException('Product not found for deletion');
    }

    await this.productRepository.remove(product);
  }
}
