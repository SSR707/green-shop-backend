import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
@Entity('reviews')
export class ReviewsEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id', nullable: true })
  user_id: string;

  @Column({ type: 'uuid', name: 'product_id', nullable: true })
  product_id: string;

  @Column({ type: 'float', name: 'rating', nullable: true })
  rating: number;

  @Column({ type: 'text', name: 'comment', nullable: true })
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
