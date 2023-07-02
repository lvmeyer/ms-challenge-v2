import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  Product,
  Basket,
  CreateBasketRequest,
  UpdateBasketRequest,
} from '@app/common';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(basketId: string, productId: string): Promise<void> {
    try {
      const basket = await this.basketRepository.findOne({
        where: {
          id: basketId,
        },
        relations: {
          products: true,
        },
      });
      if (!basket) {
        throw new NotFoundException('Basket not found to remove product');
      }

      const product = await this.productRepository.findOneBy({
        id: productId,
      });
      if (!product) {
        throw new NotFoundException(
          'Product not found to update (remove) Basket',
        );
      }

      await this.basketRepository
        .createQueryBuilder()
        .relation(Basket, 'products')
        .of(basketId)
        .add(productId);

      let productIsInBasket = false;
      basket.products.map(async (productInBasket) => {
        if (productInBasket.id === productId) {
          productIsInBasket = true;
        }
      });
      if (!productIsInBasket) {
        await this.basketRepository.update(basketId, {
          price: basket.price + product.price,
        });
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async removeProduct(basketId: string, productId: string): Promise<void> {
    try {
      const basket = await this.basketRepository.findOne({
        where: {
          id: basketId,
        },
        relations: {
          products: true,
        },
      });
      if (!basket) {
        throw new NotFoundException('Basket not found to remove product');
      }

      const product = await this.productRepository.findOneBy({
        id: productId,
      });
      if (!product) {
        throw new NotFoundException(
          'Product not found to update (remove) Basket',
        );
      }

      await this.basketRepository
        .createQueryBuilder()
        .relation(Basket, 'products')
        .of(basketId)
        .remove(productId);

      let productIsInBasket = false;
      basket.products.map(async (productInBasket) => {
        if (productInBasket.id === productId) {
          productIsInBasket = true;
        }
      });
      if (productIsInBasket) {
        await this.basketRepository.update(basketId, {
          price: basket.price - product.price,
        });
      }
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createBasket(createBasketRequest: CreateBasketRequest): Promise<any> {
    try {
      return await this.basketRepository.save(createBasketRequest);
    } catch (err) {
      throw new InternalServerErrorException(err.driverError.message);
    }
  }

  async findAll(): Promise<Basket[]> {
    return this.basketRepository.find();
  }

  async find(uuid: string): Promise<Basket> {
    const basket = await this.basketRepository.findOneBy({ id: uuid });
    if (!basket) {
      throw new NotFoundException('Basket not found');
    }

    return basket;
  }

  async findWithProducts(uuid: string): Promise<Basket> {
    const basket = await this.basketRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        products: {
          category: true,
        },
      },
    });
    if (!basket) {
      throw new NotFoundException('Basket not found');
    }
    return basket;
  }

  async update(
    uuid: string,
    updateBasketRequest: UpdateBasketRequest,
  ): Promise<any> {
    try {
      const basket = await this.basketRepository.findOneBy({ id: uuid });
      if (!basket) {
        throw new NotFoundException('Basket not found for update');
      }
      return await this.basketRepository.update(uuid, updateBasketRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async delete(uuid: string): Promise<any> {
    const basket = await this.basketRepository.findOne({
      where: {
        id: uuid,
      },
      relations: {
        products: {
          category: true,
        },
      },
    });
    if (!basket) {
      throw new NotFoundException('Basket not found for deletion');
    }

    for (const product of basket.products) {
      await this.basketRepository
        .createQueryBuilder()
        .relation(Basket, 'products')
        .of(uuid)
        .remove(product);
    }

    return;
  }
}
