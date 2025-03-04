import { BadRequestException, Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { ERROR } from '../common/err-message';
import { CouponService } from '../coupon/coupon.service';
import { PointType } from '../point/enums/point-type.enum';
import { PointService } from '../point/point.service';
import { Product } from '../product/entities/product.entity';
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
    private readonly pointService: PointService,
    private readonly couponService: CouponService,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  @Transactional()
  async newOrder(dto: AddOrderRequest) {
    const user = await this.userService.findOneByIdOrThrow(dto.userId);
    const products = await this.productService.findByIds(dto.productIds);

    await this.validateNewOrder(dto, user.id, products);
    const totalPrice = products.reduce((acc, cur) => acc + cur.price, 0);

    const order = await this.orderRepository.save(
      dto.toEntity(user, totalPrice, dto.point, dto.couponId),
    );
    await this.orderItemRepository.save(dto.toItemEntities(order, products));
    await this.productService.decreaseStock(products);
    await this.couponService.useCoupon(dto.couponId, user.id);
    await this.pointService.usePoint(user.id, dto.point, PointType.ORDER);
  }

  private async validateNewOrder(
    dto: AddOrderRequest,
    userId: number,
    products: Product[],
  ) {
    this.validateProducts(dto.productIds, products);
    await this.validatePoint(userId, dto.point);
    await this.validateCoupon(userId, dto.couponId);
  }

  private validateProducts(productIds: number[], products: Product[]) {
    if (products.length !== productIds.length) {
      throw new BadRequestException('상품이 유효하지 않습니다.');
    }

    if (!products.every((product) => product.stock > 0)) {
      throw new BadRequestException(
        '재고가 없는 상품이 주문에 포함되었습니다.',
      );
    }
  }

  private async validatePoint(userId: number, usePoint?: number) {
    if (!usePoint) {
      return;
    }

    const point = await this.pointService.getUserPoint(userId);
    if (point < usePoint) {
      throw new BadRequestException(ERROR.pointNotEnough);
    }
  }

  private async validateCoupon(userId: number, couponId?: number) {
    if (!couponId) {
      return;
    }

    const coupon = await this.couponService.findUserCoupon(couponId, userId);
    if (!coupon) {
      throw new BadRequestException('유효하지 않는 쿠폰입니다.');
    }

    if (coupon.couponUsers?.length === 0) {
      throw new BadRequestException('쿠폰 정보가 일치하지 않습니다.');
    }
  }
}
