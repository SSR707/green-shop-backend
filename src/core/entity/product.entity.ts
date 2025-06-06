import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { ReviewsEntity } from './reviews.entity';
import {
  ProductDiscountEnum,
  ProductSizeEnum,
  ProductTypeEnum,
} from 'src/common';
import { CartItemEntity } from './cart-item.entity';
@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'category_id' })
  category_id: string;

  @Column({ type: 'varchar', name: 'title', nullable: true })
  title: string;

  @Column({ type: 'varchar', name: 'picture', nullable: true })
  picture: string;

  @Column({ type: 'varchar', name: 'summary', nullable: true })
  summary: string;

  @Column({ type: 'text', name: 'description', nullable: true })
  description: string;

  @Column({
    type: 'decimal',
    name: 'price',
    precision: 12,
    scale: 2,
    nullable: true,
  })
  price: number;

  @Column({ enum: ProductDiscountEnum, name: 'discount_type', nullable: true })
  discount_type: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    name: 'discount_value',
    nullable: true,
  })
  discount_value: number;

  @Column({ type: 'varchar', name: 'tags', nullable: true })
  tags: string;

  @Column({ enum: ProductSizeEnum, name: 'size', nullable: true })
  size: string;

  @Column({ enum: ProductTypeEnum, name: 'type', nullable: true })
  type: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.product)
  reviews: ReviewsEntity[];

  @OneToMany(() => CartItemEntity, (cart_item) => cart_item.product)
  cart_item: CartItemEntity[];
}
