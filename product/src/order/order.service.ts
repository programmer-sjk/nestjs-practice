import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { ERROR } from '../common/err-message';
import { CouponService } from '../coupon/coupon.service';
import { Coupon } from '../coupon/entities/coupon.entity';
import { PointType } from '../point/enums/point-type.enum';
import { PointService } from '../point/point.service';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { AddOrderRequest } from './dto/add-order.request';
import { RefundRequest } from './dto/refund.request';
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
    const coupon = dto.couponId
      ? await this.couponService.findUserCoupon(dto.couponId, user.id)
      : undefined;

    await this.validateNewOrder(dto, products, coupon);
    const originalPrice = products.reduce((acc, cur) => acc + cur.price, 0);
    const payPrice = this.calculatePrice(originalPrice, dto.point, coupon);

    const order = await this.orderRepository.save(
      dto.toEntity(user, originalPrice, payPrice, dto.point, dto.couponId),
    );
    await this.orderItemRepository.save(dto.toItemEntities(order, products));
    await this.productService.decreaseStock(products);

    if (dto.couponId) {
      await this.couponService.useCoupon(dto.couponId, user.id);
    }

    if (dto.point) {
      await this.pointService.usePoint(
        user.id,
        dto.point,
        PointType.ORDER,
        order.id,
      );
    }
  }

  private async validateNewOrder(
    dto: AddOrderRequest,
    products: Product[],
    coupon?: Coupon,
  ) {
    this.validateProducts(dto.productIds, products);
    await this.validatePoint(dto.userId, dto.point);
    await this.validateCoupon(coupon);
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

    const canUsePoint = await this.pointService.canUsePoint(userId, usePoint);
    if (!canUsePoint) {
      throw new BadRequestException(ERROR.pointNotEnough);
    }
  }

  private async validateCoupon(coupon?: Coupon) {
    if (!coupon) {
      return;
    }

    if (!coupon) {
      throw new BadRequestException('유효하지 않는 쿠폰입니다.');
    }

    if (coupon.couponUsers?.length === 0) {
      throw new BadRequestException('쿠폰 정보가 일치하지 않습니다.');
    }
  }

  private calculatePrice(
    originalPrice: number,
    point?: number,
    coupon?: Coupon,
  ) {
    let discountPrice = 0;

    if (point) {
      discountPrice += point;
    }

    if (coupon) {
      discountPrice += coupon.value;
    }

    return originalPrice - discountPrice;
  }

  @Transactional()
  async refund(dto: RefundRequest) {
    const order = await this.findOneOrder(dto.orderId);
    const coupon = order.couponId
      ? await this.couponService.findUserCoupon(order.couponId, order.userId)
      : undefined;

    order.refund();
    await this.orderRepository.save(order);
    if (coupon) {
      await this.couponService.refundCoupon(coupon.id, order.userId);
    }

    if (order.usedPoint > 0) {
      // await this.pointService.refundPoint();
    }
  }

  private async findOneOrder(id: number) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('주문 정보가 없습니다.');
    }

    return order;
  }
}
