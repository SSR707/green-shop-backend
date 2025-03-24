import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CartEntity } from './cart.entity';

@Entity('cart_item')
export class CartItemEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'cart_id' })
  cart_id: string;

  @Column({ type: 'uuid', name: 'product_id' })
  product_id: string;

  @Column({ type: 'int', name: 'quantity' })
  quantity: number;

  @ManyToOne(() => CartEntity, (cart) => cart.cart_item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: CartEntity;

  @ManyToOne(() => ProductEntity, (product) => product.cart_item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
