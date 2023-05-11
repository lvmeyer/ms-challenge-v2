import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BILLING_SERVICE } from '@app/common';
import { Order } from './order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderRequest, UpdateOrderRequest } from '@app/common';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {} // private readonly configService: ConfigService,

  async createOrder(createOrderRequest: CreateOrderRequest): Promise<any> {
    this.billingClient.emit('create-order', {});
    return this.orderRepository.save(createOrderRequest);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async find(uuid: string): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: uuid });
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async update(
    uuid: string,
    updateOrderRequest: UpdateOrderRequest,
  ): Promise<any> {
    const order = await this.orderRepository.findOneBy({ id: uuid });
    if (!order) {
      throw new NotFoundException('Order not found for update');
    }

    return await this.orderRepository.update(uuid, updateOrderRequest);
  }

  async delete(uuid: string): Promise<any> {
    const order = await this.orderRepository.findOneBy({ id: uuid });
    if (!order) {
      throw new NotFoundException('Order not found for deletion');
    }

    await this.orderRepository.remove(order);
  }
}
