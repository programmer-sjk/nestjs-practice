import { IsArray, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';

export class AddOrderRequest {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsArray()
  @IsInt({ each: true })
  productIds: number[];

  @IsOptional()
  @IsInt()
  point?: number;

  @IsOptional()
  @IsInt()
  couponId?: number;

  toEntity(
    user: User,
    originalPrice: number,
    payPrice: number,
    point?: number,
    couponId?: number,
  ) {
    return Order.newOrder(user, originalPrice, payPrice, point, couponId);
  }

  toItemEntities(order: Order, products: Product[]) {
    return products.map((product) => OrderItem.of(order, product));
  }
}
