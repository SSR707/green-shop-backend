import { BaseEntity } from 'src/common/database/BaseEntity';
import { RoleEnum } from 'src/common/enum/user.enums';
import { Column, Entity, OneToMany } from 'typeorm';
import { AddressEntity } from './address.entity';
import { ReviewsEntity } from './reviews.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', name: 'fullname', nullable: true })
  fullname: string;

  @Column({ type: 'varchar', name: 'email', unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @Column({ type: 'varchar', name: 'avatar', nullable: true })
  avatar: string;

  @Column({ type: 'varchar', name: 'phone_number', nullable: true })
  phone_number: string;

  @Column({ enum: RoleEnum, default: RoleEnum.USER })
  role: string;

  @Column({ type: 'boolean', name: 'is_active', default: false })
  is_active: boolean;

  @OneToMany(() => AddressEntity, (address) => address.user , {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  address: AddressEntity[];

  @OneToMany(() => ReviewsEntity, (reviews) => reviews.user , {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  reviews: ReviewsEntity[];
}
