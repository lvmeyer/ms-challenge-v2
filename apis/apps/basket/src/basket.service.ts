import {
  BadGatewayException,
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from '@app/common';
import { Basket } from './basket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBasketRequest, UpdateBasketRequest } from '@app/common';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepository: Repository<Basket>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {} // private readonly configService: ConfigService,

  async createBasket(createBasketRequest: CreateBasketRequest): Promise<any> {
    // this.billingClient.emit('create-basket', {});
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
    const basket = await this.basketRepository.findOneBy({ id: uuid });
    if (!basket) {
      throw new NotFoundException('Basket not found for deletion');
    }

    await this.basketRepository.remove(basket);
  }
}
