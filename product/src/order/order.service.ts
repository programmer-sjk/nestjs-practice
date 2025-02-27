import { BadRequestException, Injectable } from '@nestjs/common';
import { CouponService } from '../coupon/coupon.service';
import { Coupon } from '../coupon/entities/coupon.entity';
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

  async newOrder(dto: AddOrderRequest) {
    const user = await this.userService.findOneById(dto.userId);
    if (!user) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }

    const products = await this.productService.findByIds(dto.productIds);
    this.validateProducts(dto.productIds, products);
    const totalPrice = products.reduce((acc, cur) => acc + cur.price, 0);

    let userPoint: number;
    if (dto.point) {
      userPoint = await this.pointService.getUserTotalPoint(user.id);
      if (userPoint < dto.point) {
        throw new BadRequestException('포인트가 부족합니다.');
      }
    }

    let coupon: Coupon;
    if (dto.couponId) {
      coupon = await this.couponService.findUserCoupon(dto.couponId, user.id);

      if (!coupon || coupon.couponUsers?.length === 0) {
        throw new BadRequestException('잘못된 쿠폰입니다.');
      }
    }

    // const order = await this.orderRepository.save(
    //   dto.toEntity(user, totalPrice),
    // );
    // await this.orderItemRepository.save(dto.toItemEntities(order, products));
    // await this.productService.decreaseStock(products);
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
}
