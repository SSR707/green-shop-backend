import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { OrderEntity } from './order.entity';
import { CartItemEntity } from './cart-item.entity';
@Entity('cart')
export class CartEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column({
    type: 'decimal',
    precision: 20,
    scale: 2,
    name: 'total',
    nullable: true,
  })
  total: number;

  @OneToOne(() => UserEntity, (user) => user.cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => OrderEntity, (order) => order.cart)
  order: OrderEntity;

  @OneToMany(() => CartItemEntity, (cart_item) => cart_item.cart)
  cart_item: CartItemEntity[];
}
