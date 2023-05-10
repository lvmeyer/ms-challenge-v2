import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from './constants/services';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import { CreateOrderRequest } from './dto/orders.request';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {} // private readonly configService: ConfigService,

  async createOrder(createOrderRequest: CreateOrderRequest): Promise<Order> {
    this.billingClient.emit('create-order', {});

    console.log('==heree', createOrderRequest);
    return this.orderRepository.save(createOrderRequest);
  }
}
