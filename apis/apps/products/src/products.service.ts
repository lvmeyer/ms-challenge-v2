import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE, Product } from '@app/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductRequest, UpdateProductRequest } from '@app/common';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {} // private readonly configService: ConfigService,

  // ---------------------------------------
  // ---------------- CRUD -----------------
  // ---------------------------------------
  async createProduct(
    createProductRequest: CreateProductRequest,
  ): Promise<any> {
    // this.billingClient.emit('create-product', {});

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
}
