import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { AddOrderRequest } from './dto/add-order.request';
import { OrderItemRepository } from './repositories/order-item.repository';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  async newOrder(dto: AddOrderRequest) {
    const user = await this.userService.findOneById(dto.userId);
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    const products = await this.productService.findByIds(dto.productIds);
    if (products.length !== dto.productIds.length) {
      throw new BadRequestException('상품이 유효하지 않습니다.');
    }

    const order = await this.orderRepository.save(dto.toEntity(user));
    await this.orderItemRepository.save(dto.toItemEntities(order, products));
  }
}
