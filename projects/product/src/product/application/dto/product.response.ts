import { Exclude, Expose } from 'class-transformer';
import { Product } from '../../domain/entities/product.entity';
import { ProductStatus } from '../../domain/enums/product-status.enum';

export class ProductResponse {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _storeId: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _basePrice: number;
  @Exclude() private readonly _description?: string;
  @Exclude() private readonly _thumbnailUrl?: string;
  @Exclude() private readonly _status: ProductStatus;
  @Exclude() private readonly _createdAt: Date;

  constructor(
    id: number,
    storeId: number,
    name: string,
    basePrice: number,
    status: ProductStatus,
    createdAt: Date,
    description?: string,
    thumbnailUrl?: string,
  ) {
    this._id = id;
    this._storeId = storeId;
    this._name = name;
    this._basePrice = basePrice;
    this._description = description;
    this._thumbnailUrl = thumbnailUrl;
    this._status = status;
    this._createdAt = createdAt;
  }

  static from(product: Product) {
    return new ProductResponse(
      product.id,
      product.storeId,
      product.name,
      product.basePrice,
      product.status,
      product.createdAt,
      product.description,
      product.thumbnailUrl,
    );
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get storeId(): number {
    return this._storeId;
  }

  @Expose()
  get name(): string {
    return this._name;
  }

  @Expose()
  get basePrice(): number {
    return this._basePrice;
  }

  @Expose()
  get description(): string {
    return this._description ?? '';
  }

  @Expose()
  get thumbnailUrl(): string {
    return this._thumbnailUrl ?? '';
  }

  @Expose()
  get status(): ProductStatus {
    return this._status;
  }

  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
}
