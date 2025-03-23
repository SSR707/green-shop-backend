import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('address')
export class AddressEntity extends BaseEntity {
  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column({ type: 'varchar', name: 'title', nullable: true })
  title: string;

  @Column({ type: 'varchar', name: 'address_line_1', nullable: true })
  address_line_1: string;

  @Column({ type: 'varchar', name: 'address_line_2', nullable: true })
  address_line_2: string;

  @Column({ type: 'varchar', name: 'country', nullable: true })
  country: string;

  @Column({ type: 'varchar', name: 'city', nullable: true })
  city: string;

  @Column({ type: 'varchar', name: 'postal_code', nullable: true })
  postal_code: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phone_number: string;

  @Column({ type: 'varchar', name: 'landmark', nullable: true })
  landmark: string;

  @ManyToOne(() => UserEntity, (user) => user.address, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
