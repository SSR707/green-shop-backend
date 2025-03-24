import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductEntity } from './product.entity';
@Entity('category')
export class CategoryEntity extends BaseEntity {

  @Column({ type: 'varchar', name: 'picture', nullable: true })
  picture: string;
  
  @Column({ type: 'varchar', name: 'name', nullable: true })
  name: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'tag', nullable: true })
  tag: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
