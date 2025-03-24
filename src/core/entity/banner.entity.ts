import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('banner')
export class BannerEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'image', nullable: true })
  image: string;
}
