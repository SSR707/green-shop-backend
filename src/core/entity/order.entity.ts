import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { CartEntity } from './cart.entity';
@Entity('order')
export class OrderEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column({ type: 'uuid', name: 'cart_id' })
  cart_id: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => CartEntity, (cart) => cart.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;
}
